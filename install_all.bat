@echo off
echo Installing root dependencies...
call npm install
pause

echo Installing server dependencies...
cd server
call npm install cors
cd ..
echo Finished server dependencies...
pause

echo Installing client dependencies...
cd frontend
call npm install
cd ..
echo Finished client dependencies...
pause

echo All dependencies installed!
