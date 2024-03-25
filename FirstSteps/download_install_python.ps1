$PYTHON_VERSION=$args[0]
if ([bool]$PYTHON_VERSION){
	echo "version selected: "$PYTHON_VERSION} 
else {
	echo "no version has been selected, try again"
	return}
	
$PYTHON_URL = "https://www.python.org/downloads/release/python-"+$PYTHON_VERSION+"/"
echo "Conecting to:"$PYTHON_URL

try { 
$GET_HTML = Invoke-WebRequest $PYTHON_URL}
catch { 
echo "An error occurred. Check requested version" 
return}


$FILE = $GET_HTML.Links | Select-Object @{Label='href';Expression={@{$true=$_.href}[$_.href.EndsWith('amd64.exe')]}} | Select-Object -ExpandProperty href
echo "installer found: "$FILE

$DOWNLOAD_DIR = "" 	#download location here
$OUTPUT_FILE = ($DOWNLOAD_DIR+"python"+$PYTHON_VERSION+"-amd64.exe")

echo "downloading into: "$OUTPUT_FILE
(new-object System.Net.WebClient).DownloadFile($FILE, $OUTPUT_FILE)

$INSTALL_PATH= ""+$PYTHON_VERSION #installation path here
$PIP_COMMAND = $INSTALL_PATH+'\Scripts\pip install jupyterlab'
echo "installing into: "$INSTALL_PATH
cmd.exe /c $OUTPUT_FILE TargetDir=$INSTALL_PATH PrependPath=1 /S
cmd.exe /c $PIP_COMMAND 