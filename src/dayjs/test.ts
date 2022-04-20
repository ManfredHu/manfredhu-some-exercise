import dayjs from "dayjs"

const start = dayjs().add(-90, 'day').startOf('day')
const now = dayjs()
const startTimeString = start.format('YYYY-MM-DD')
const nowTimeString = now.format('YYYY-MM-DD')

const timeRange = [start, now]
const obj = {
  start_time: timeRange[0].unix(),
  end_time: timeRange[1].unix(),
}

console.log(obj)