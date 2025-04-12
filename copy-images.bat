@echo off
echo Copying background images to multiple locations for redundancy...

rem Create directories if they don't exist
mkdir public\images\ui 2>nul
mkdir public\img 2>nul
mkdir public\backgrounds 2>nul
mkdir .next\static\images 2>nul
mkdir .next\static\media 2>nul

rem Copy the background image to multiple locations
echo Copying gcs-website-bg.png...
copy "public\assets\images\ui\gcs-website-bg.png" "public\images\ui\" /Y
copy "public\assets\images\ui\gcs-website-bg.png" "public\img\" /Y
copy "public\assets\images\ui\gcs-website-bg.png" "public\backgrounds\" /Y
copy "public\assets\images\ui\gcs-website-bg.png" "public\" /Y

rem Copy the loader image to multiple locations
echo Copying gcs-loader-image.png...
copy "public\assets\images\ui\gcs-loader-image.png" "public\images\ui\" /Y
copy "public\assets\images\ui\gcs-loader-image.png" "public\img\" /Y
copy "public\assets\images\ui\gcs-loader-image.png" "public\" /Y

echo Done! Images copied to multiple locations.
echo.
echo Now you can reference these images using various paths:
echo - /assets/images/ui/gcs-website-bg.png
echo - /images/ui/gcs-website-bg.png
echo - /img/gcs-website-bg.png
echo - /backgrounds/gcs-website-bg.png
echo - /gcs-website-bg.png
echo.
pause
