#!/bin/bash

mkdir -p stodvar
# Uncomment the line below to fetch all stations from vedur.is.
#curl https://www.vedur.is/vedur/stodvar/\?t\=3 |  grep -i 'Upplýsingar' | grep -o 'href=".*"' | cut -c 25- | tr -d \" | xargs -L1 -I% curl https://vedur.is/vedur/stodvar/\?s\=% -o ./stodvar/%.html
cd stodvar
echo "[" > stations
for f in $(ls)
do
        grep -ioE  '(Nafn|Stöðvanúmer).*<td>(.+)</td>' $f | sed 's/<\/td>//g;s/<td>/:/g;s/Nafn/name/g;s/Stöðvanúmer/id/g' | sed 's/\(^.*\):\(.*$\)/\"\1\":\"\2\"/g' | tr '\n' ',' | sed 's/\(.*\),$/\{\1\},/g' >> stations
done

sed 's/,$/\n]/' stations > stations.json
mv stations.json ../../weather-app/ClientApp/src/stations.json
rm stations