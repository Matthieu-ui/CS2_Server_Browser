@echo off
echo Installing client dependencies...
cd client
pnpm install
if errorlevel 1 (
    echo Failed to install client dependencies.
    exit /b 1
)

echo Installing server dependencies...
cd ../server
pnpm install
if errorlevel 1 (
    echo Failed to install server dependencies.
    exit /b 1
)


echo All dependencies installed. 
