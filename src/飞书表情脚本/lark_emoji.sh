#!/bin/bash

#TOTAL=117
mkdir emoji
cd emoji
for i in {1..117};
do
    curl "https://s1.pstatp.com/ee/lark-weekly-data/internal/${i}.png" -o "${i}.png" > /dev/null 2> /dev/null
    printf "\rProcess: %d%%" $[i * 100 / 117]
done
cd ..
echo ""
open emoji
echo "done"
