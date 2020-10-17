c="\x1B[93m\x1B[1m" # Color - in our case, yellow
n="\x1B[0m" # Normal / neutral
path_here="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

cd $path_here;

echo -e "${c} * Running script from $path_here$n"


echo -e "${c} * Compiling...$n"
npm run build


distDir="dist"
appName="email-tracking"
originDir="$distDir/$appName"
targetDir="public"
destination="../../../../$targetDir"

echo -e "${c} * Deleting old files...$n"
for file in ${destination}/*.html; do rm "$file";done
for file in ${destination}/*.css; do rm "$file";done
for file in ${destination}/*.ico; do rm "$file";done
for file in ${destination}/*.js; do rm "$file";done

echo -e "${c} * Moving new files...$n"
for file in ${originDir}/*.html; do cp "$file" "$destination";done
for file in ${originDir}/*.css; do cp "$file" "$destination";done
for file in ${originDir}/*.ico; do cp "$file" "$destination";done
for file in ${originDir}/*.js; do cp "$file" "$destination";done

echo -e "${c} * Cleaning up...$n"

echo -e "${c} * Moved project from '$originDir' to '$targetDir'"

