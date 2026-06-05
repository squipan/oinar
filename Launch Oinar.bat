@echo off
set "HTML_FILE=%~dp0index.html"

echo Launching Oinar...
start msedge.exe --app="file:///%HTML_FILE:\=/%"

exit
