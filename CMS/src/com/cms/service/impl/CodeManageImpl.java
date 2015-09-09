package com.cms.service.impl;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.ArrayList;
import java.util.Date;
import java.util.Enumeration;
import java.util.List;




import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.zip.CRC32;
import java.util.zip.CheckedOutputStream;
import java.util.zip.Deflater;

import javax.crypto.Cipher;
import javax.servlet.jsp.JspWriter;

import org.apache.tools.zip.ZipEntry;
import org.apache.tools.zip.ZipFile;
import org.apache.tools.zip.ZipOutputStream;

import com.cms.dao.CodeFileDao;
import com.cms.dao.UserDao;
import com.cms.domain.CodeFile;
import com.cms.domain.User;
import com.cms.service.CodeManage;
import com.opensymphony.xwork2.util.ResolverUtil.NameEndsWith;
import com.sun.org.apache.regexp.internal.recompile;

public class CodeManageImpl implements CodeManage  {
	
	private UserDao userDao;
	private CodeFileDao codeFileDao;
	
	private String projectPath; 

	public UserDao getUserDao() {
		return userDao;
	}

	public void setUserDao(UserDao userDao) {
		this.userDao = userDao;
	}

	public CodeFileDao getCodeFileDao() {
		return codeFileDao;
	}

	public void setCodeFileDao(CodeFileDao codeFileDao) {
		this.codeFileDao = codeFileDao;
	}
	
	@Override
	public String getProjectPath() {
		return this.projectPath;
	}

	@Override
	public void setProjectPath(String projectPath) {
		this.projectPath = projectPath;
	}

	@Override
	public boolean uploadCodeFile(File uploadFile, String fileName
			, CodeFile codeFile) throws Exception {
		
		//获取用户实例
		User user = userDao.get(codeFile.getUserID());
		
		//获取用户根目录
		CodeFile rootPath = codeFileDao.get(codeFileDao.getUserPathID(user.getUserID()));
		
		//设置路径
		String relativeBsePath = rootPath.getPath()+ "\\" + fileName;
		String basePath = getProjectPath() + relativeBsePath;
		
		
		//判断上传文件类型
		String fileType = fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase();
		if(!fileType.equals("zip")) {
			
			//上传单个文件
			
			if(!uploadSingleFile(uploadFile, basePath)) {
				return false;
			}
			
			codeFile.setUserID(user.getUserID());
			codeFile.setFatherFileID(rootPath.getFileID());
			codeFile.setName(fileName);
			codeFile.setPath(relativeBsePath);
			codeFile.setUploadTime(new Date());
			if(codeFileDao.save(codeFile) <= 0) {
				return false;
			}
			return true;
		}else {
			
			//上传ZIP文件
			
			//去除ZIP后缀
			basePath = basePath.substring(0,basePath.lastIndexOf(".")); 
			relativeBsePath = relativeBsePath.substring(0, relativeBsePath.lastIndexOf(".")); 
			
			//解压缩ZIP文件到用户目录
			if(!uploadZipFile(uploadFile,basePath)) {
				return false;
			}
			
			//遍历文件结果，插入文件记录
			if(!insertFilesRecord(basePath,relativeBsePath,user,rootPath,codeFile)) {
				return false;
			}
			return true;
		}
	}
	
	//用户上传单个文件
	private boolean uploadSingleFile(File uploadFile,String outPath) throws Exception {
	
		File outFile = new File(outPath);
		FileInputStream fis = new FileInputStream(uploadFile);
		FileOutputStream fos = new FileOutputStream(outFile);
		
		if(!outFile.getParentFile().exists()) {
			if(!outFile.getParentFile().mkdirs()) {
				fis.close();
				fos.close();
				return false;
			}
		}
		
		byte [] buffer = new byte[1024 * 10];
		int len = 0;
		while((len = fis.read(buffer,0,buffer.length)) > 0) {
			fos.write(buffer,0,len);
		}
		fos.flush();
		fos.close();
		fis.close();
		return true;
	}
	
	//用户上传ZIP文件
	private boolean uploadZipFile(File uploadFile,String outPath) throws Exception {
		
		//新建项目目录
		File basePath = new File(outPath);
		if(!basePath.exists()) {
			if(!basePath.mkdirs()) {
				return false;
			}
		}
		
		//新建ZIP对象
		ZipFile zip = new ZipFile(uploadFile, "GBK");
		ZipEntry entry = null;
		byte [] buffer = new byte[1024 * 10];
		int len = 0;
		InputStream fis = null;
		FileOutputStream fos = null;
		
		//循环遍历ZIP每一个入口文件，并将其写入项目目录下
		for(Enumeration<ZipEntry> enu = zip.getEntries(); enu.hasMoreElements();) {
			
			//获取入口文件，获取输入流
			entry = enu.nextElement();
			fis = zip.getInputStream(entry);
			
			//若输出为目录，则新建目录，若输出为文件，则设置输出流进行写入
			File temp = new File(basePath + File.separator + entry.getName());
			
			//输出为目录，新建目录
			if(entry.getName().endsWith(File.separator) || entry.getName().endsWith("/")) {
				if(!temp.mkdirs()) return false;
				fis.close();
				continue;
			}
			
			//输出为文件，检查父目录是否存在，不存在的新建目录
			if(!temp.getParentFile().exists()) {
				if(!temp.getParentFile().mkdirs()) {
					return false;
				}
			}
			fos = new FileOutputStream(temp);
			
			//实际写入
			while((len = fis.read(buffer,0,buffer.length)) > 0) {
				fos.write(buffer,0,len);
			}
			fos.flush();
			fos.close();
			fis.close();
		}
		return true;
	}
	
	//递归插入解压后的文件夹下所有文件记录到数据库
	private boolean insertFilesRecord(String basePath, String relativeBsePath
			,User user, CodeFile fatherPath,CodeFile baseFileInfo) {
		
		//获取文件实例
		File currentFile = new File(basePath);
		if(!currentFile.exists()) return false;
		
		//插入文件记录到数据库
		CodeFile codeFile = new CodeFile();
		codeFile.setUserID(user.getUserID());
		codeFile.setFatherFileID(fatherPath.getFileID());
		codeFile.setName(currentFile.getName());
		codeFile.setPath(relativeBsePath);
		codeFile.setIsShare(baseFileInfo.getIsShare()); 
		codeFile.setUploadTime(new Date());
		codeFile.setDescription(baseFileInfo.getDescription());	//让根目录文件记录描述为用户描述
		baseFileInfo.setDescription("");		//其他子目录文件记录描述为空字符串
		if(codeFileDao.save(codeFile) <= 0) {
			return false;
		}
		
		//如果当前文件非目录文件，结束递归
		if(!currentFile.isDirectory()) return true;
		
		//如果当前文件是目录文件，获取子目录文件并递归插入文件数据
		File [] childFiles = currentFile.listFiles();
		for(File childFile : childFiles) {
			
			String childPath = childFile.getPath();
			String childRelativePath = relativeBsePath + File.separator + childFile.getName();
			
			//递归调用，返回递归的结果
			if(!insertFilesRecord(childPath, childRelativePath
					, user, codeFile, baseFileInfo)) {
				return false;
			}
		}
		return true;
	}

	@Override
	public InputStream downloadZipProject(Integer codeFileID, CodeFile reProjectFile) throws Exception {
		
		//步骤1：获取项目根目录文件实例
		CodeFile codeFile = codeFileDao.get(codeFileID);
		Integer userPathID = getUserPathID(codeFile.getUserID());
		
		CodeFile projectFile  = codeFile;
		while(!projectFile.getFatherFileID().equals(userPathID)) {
			
			projectFile = codeFileDao.get(projectFile.getFatherFileID());	
		}
		
		
		//步骤2：获取项目ZIP文件路径
		String projectRealPath = getProjectPath() + projectFile.getPath();
		int temp1 = projectRealPath.lastIndexOf(File.separator);
		String projectFileName = projectRealPath.substring(temp1 + File.separator.length());
		int temp2 = projectFileName.lastIndexOf(".");
		String zipRealPath;
		if(temp2 == -1) {
			//设置返回的项目文件名
			reProjectFile.setName(projectFile.getName()); 
			zipRealPath = projectRealPath + ".zip";
		}else {
			reProjectFile.setName(projectFile.getName().substring( 
					0,projectFile.getName().lastIndexOf("."))); 
			zipRealPath = projectRealPath.substring(0,temp1 + temp2 + 1) + ".zip"  ;
		}
		
		//处理中文乱码
		reProjectFile.setName(new String(reProjectFile.getName().getBytes(),"ISO-8859-1"));

		
		//步骤3：删除已存在的
		File zipFile = new File(zipRealPath);
		if(zipFile.exists()) {
			zipFile.delete();
		}
		
		//步骤4：压缩项目获取ZIP文件
		compressFile(projectRealPath, zipRealPath);
		
		//步骤5：返回ZIP文件输入流
		return new FileInputStream(zipRealPath);
	}
	
	//压缩文件
	private void compressFile(String sourceFilePath,String zipFilePath ) throws Exception {
		
		//步骤1：获取压缩源文件
		File sourceFile = new File(sourceFilePath);
		
		//步骤2：获取ZIP文件输出流
		FileOutputStream fos = null;
		try {
			fos = new FileOutputStream(zipFilePath);
		} catch (Exception e) {
			if (fos != null) {  
                try{ fos.close(); } catch (Exception e1) {}  
            } 
		}
		
		// 使用指定校验和创建输出流  
        CheckedOutputStream csum = new CheckedOutputStream(fos, new CRC32());  
        // 创建压缩流  
        ZipOutputStream zos = new ZipOutputStream(csum);  
        // 设置编码，支持中文  
        zos.setEncoding("utf-8");
        // 启用压缩  
        zos.setMethod(ZipOutputStream.DEFLATED);  
        // 设置压缩级别为最强压缩  
        zos.setLevel(Deflater.BEST_COMPRESSION);  
        // 压缩文件缓冲流  
        BufferedOutputStream bout = null;
        try {  
            // 封装压缩流为缓冲流  
            bout = new BufferedOutputStream(zos);  
            // 对数据源进行压缩  
            compress(zos, bout, sourceFile, sourceFile.getParent());  
        } finally {  
            if (bout != null) {  
                try{ bout.close(); } catch (Exception e) {}  
            }  
        }
			
	}
	
	//压缩文件的递归方法
	private void compress(ZipOutputStream zos, BufferedOutputStream bout,
			File sourceFile, String basePath) throws Exception {
		
		 // 获取压缩条目名，初始时将要压缩的文件或目录的相对路径  
        String entryName = sourceFile.getAbsolutePath().substring(basePath.length() + File.separator.length());  
        // 判断是文件还是目录，如果是目录，则继续迭代压缩  
        if (sourceFile.isDirectory()) {  
            // 如果是目录，则需要在目录后面加上分隔符('/')  
        	ZipEntry zipEntry = new ZipEntry(entryName + File.separator);  
            zos.putNextEntry(zipEntry);  
            // 获取目录中的文件，然后迭代压缩  
            File[] srcFiles = sourceFile.listFiles();  
            for (int i = 0; i < srcFiles.length; i++) {  
                // 压缩  
                compress(zos, bout, srcFiles[i], basePath);  
            }  
        } else {  
            // 开始写入新的ZIP文件条目并将流定位到条目数据的开始处  
            ZipEntry zipEntry = new ZipEntry(entryName);  
            // 向压缩流中写入一个新的条目  
            zos.putNextEntry(zipEntry);  
            // 读取将要压缩的文件的输入流  
            BufferedInputStream bin = null;  
            try{  
                // 获取输入流读取文件  
                bin = new BufferedInputStream(new FileInputStream(sourceFile));  
                // 读取文件，并写入压缩流  
                byte[] buffer = new byte[1024];  
                int readCount = -1;  
                while ((readCount = bin.read(buffer)) != -1) {  
                    bout.write(buffer, 0, readCount);  
                }  
                // 注，在使用缓冲流写压缩文件时，一个条件完后一定要刷新，不然可能有的内容就会存入到后面条目中去了  
                bout.flush();  
                // 关闭当前ZIP条目并定位流以写入下一个条目  
                zos.closeEntry();  
            } finally {  
                if (bin != null) {  
                    try { bin.close(); } catch (Exception e) {}  
                }  
            }  
        }
	}

	@Override
	public boolean deleteFile(Integer codeFileID) {
		
		//获取文件实例
		CodeFile codeFile = codeFileDao.get(codeFileID);
		String fileRealPath = getProjectPath() + codeFile.getPath();
		File file = new File(fileRealPath);
		
		//调用递归函数，删除文件及其下所有目录
		if(!delete(file)) {
			return false;
		}
		
		//获取文件及其所有子文件的持久化对象，遍历并删除数据库记录
		List<CodeFile> childFiles = getAllChildFiles(codeFileID);
		for(int i = 0; i < childFiles.size(); i++) {
			
			codeFileDao.delete(childFiles.get(i)); 
		}
		
		return true;
	}
	
	//递归实现文件删除
	private boolean delete(File file) {
		
		if (!file.exists()) {
			return false;
		} else if (!file.isDirectory()) {
			return file.delete();
		} else {
			File[] childFiles = file.listFiles();
			for (int i = 0; i < childFiles.length; i++) {
				if (!delete(childFiles[i])) {
					return false;
				}
			}
			//删除空目录
			return file.delete();
		}
	
	}

	@Override
	public boolean updateFileInfo(CodeFile codeFile) {
		
		//修改文件名
		CodeFile preCodeFile = codeFileDao.get(codeFile.getFileID());
		String prePath = getProjectPath() + preCodeFile.getPath();
		int temp1 = prePath.lastIndexOf(File.separator);
		int temp2 = preCodeFile.getPath().lastIndexOf(File.separator);
		String newPath = prePath.substring(0 ,temp1) + File.separator + codeFile.getName();
		String newRealtivePath = preCodeFile.getPath().substring(0, temp2) + File.separator + codeFile.getName();
		File file = new File(prePath);
		if(!file.renameTo(new File(newPath))) {
			return false;
		}
		
		
		//获取所有子目录(包括父目录)
		List<CodeFile> childFileList = getAllChildFiles(codeFile.getFileID());
		//将需要替换的原路径以及替换内容转化为正则表达式（将反斜杠转化为四个，本身有两个）
		String replaceRegex = preCodeFile.getPath().replaceAll("\\\\", "\\\\" + "\\\\");
		String replaceMent = newRealtivePath.replaceAll("\\\\", "\\\\" + "\\\\"); 
		for(int i = 0; i < childFileList.size(); i++) {
					
			//更新子目录的路径
			String temp = childFileList.get(i).getPath().replaceFirst(replaceRegex,replaceMent);
			childFileList.get(i).setPath(temp); 
			codeFileDao.update(childFileList.get(i)); 
		}
		
		//修改父目录数据库记录
		preCodeFile.setPath(newRealtivePath);
		preCodeFile.setName(codeFile.getName());
		preCodeFile.setIsShare(codeFile.getIsShare());
		preCodeFile.setDescription(codeFile.getDescription());
		codeFileDao.update(preCodeFile);
		
		return true;
	}
	
	//获取指定文件ID的所有子文件实例集合(包括父文件)
	private List<CodeFile> getAllChildFiles(Integer codeFileID ) {
		
		List<CodeFile> childFileList = new ArrayList<CodeFile>();
		
		CodeFile fatherFile = codeFileDao.get(codeFileID);
		List<CodeFile> tempList = codeFileDao.findChildFileList(codeFileID);
		
		//先将父文件加入集合
		childFileList.add(fatherFile);
		
		//递归获取所有子文件实例
		if(tempList.size() != 0) {
			getNextChildFiles(childFileList, tempList); 
		}
		
		return childFileList;
	}
	
	//递归获取每一级文件子目录文件集合
	private void getNextChildFiles(List<CodeFile> childFileList, List<CodeFile> preFileList ) {
		
			//将已有的上级录加入到集合中
			childFileList.addAll(preFileList);
			
			//遍历每一个上一级目录，获取所有下一级文件目录
			for(CodeFile codeFile : preFileList) {
				
				List<CodeFile> tempList = codeFileDao.findChildFileList(codeFile.getFileID());
				if(tempList.size() != 0) {
					getNextChildFiles(childFileList, tempList); 
				}
			}
	}

	@Override
	public CodeFile getFileByID(Integer codeFileID) {
		
		return codeFileDao.get(codeFileID);
	}

	@Override
	public Integer getUserPathID(Integer userID) {
		return codeFileDao.getUserPathID(userID);
	}

	@Override
	public List<CodeFile> getFileList(User user, Integer fatherPathID,
			boolean isCheckeShare, int page) {
		
		int offset = (page - 1) * PAGE_SIZE;
		if (user.getIsManager())  {
			isCheckeShare = false;
		}
		return codeFileDao.findList(user.getUserID(), fatherPathID,
				isCheckeShare,user.getIsManager(), offset, PAGE_SIZE); 
	}

	@Override
	public int getPageNum(User user, Integer fatherPathID, boolean isCheckeShare) {
		
		if (user.getIsManager())  {
			isCheckeShare = false;
		}
		int recordNum = codeFileDao
				.getRecordNum(user.getUserID(), fatherPathID, isCheckeShare,user.getIsManager());
		return recordNum % PAGE_SIZE == 0
				? recordNum / PAGE_SIZE : recordNum /PAGE_SIZE + 1;
	}

	@Override
	public List<CodeFile> getSharedProject(int page) {
		
		int offset = (page - 1) * PAGE_SIZE;
		
		return codeFileDao.findProjectList(offset, PAGE_SIZE);
	}

	@Override
	public int getSharedPageNum() {
		
		int recordNum = codeFileDao.getProjectRecordNum();
		return recordNum % PAGE_SIZE == 0
				? recordNum / PAGE_SIZE : recordNum /PAGE_SIZE + 1;
	}

	@Override
	public boolean isFile(CodeFile codeFile) {
		
		String fileRealPath = getProjectPath() + codeFile.getPath();
		File viewedFile = new File(fileRealPath);
		return viewedFile.isFile();
	}

	@Override
	public void getFileContent(CodeFile viewFile,JspWriter out) throws Exception {
		
		File file;
		BufferedReader reader = null;
		
		try {
			file = new File(getProjectPath() +  viewFile.getPath());
			reader = new BufferedReader(new InputStreamReader
					(new FileInputStream(file),"utf-8"));	//指定编码格式，防止中文乱码
			
			String tempString = null;
			int line = 1;
			Pattern p = Pattern.compile(".*?<|>.*?");
			Matcher m = null;
			
			while((tempString = reader.readLine()) != null) {
				
				m = p.matcher(tempString);
				if(m.find()) {
					tempString = tempString.replaceAll("<", "&lt;");
					tempString = tempString.replaceAll(">", "&gt;");
				}
				tempString = tempString.replaceAll("\t", "&nbsp;&nbsp;&nbsp;&nbsp;");		//转化制表符的表示
				out.println("<tr><td>" + line+ ": </td>" + "<td>" +  tempString + "<td></tr>");
				line++;
			}
			reader.close();
		} catch (Exception e) {
			e.printStackTrace();
		}finally {
            if (reader != null) {
            	reader.close();
            }
		}
		
	}

	@Override
	public Integer getProjectRootPathID(Integer codeFileID) {
		
		//步骤1：获取项目根目录文件实例
		CodeFile codeFile = codeFileDao.get(codeFileID);
		Integer userPathID = getUserPathID(codeFile.getUserID());
				
		CodeFile projectFile  = codeFile;
		while(!projectFile.getFatherFileID().equals(userPathID)) {
					
			projectFile = codeFileDao.get(projectFile.getFatherFileID());	
		}
		
		return projectFile.getFileID();
	}
	
	
}
