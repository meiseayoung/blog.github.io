export default function downloadFileFromBlob(blob) {
  let blob = new Blob([res], { type: res.type });
  if ("msSaveOrOpenBlob" in navigator) {
    window.navigator.msSaveOrOpenBlob(
      blob,
      `${this.upperCaseFirstLetter(dataType)}_Errors.csv`
    );
    return;
  }
  let downloadElement = document.createElement("a");
  let href = window.URL.createObjectURL(blob); //创建下载的链接
  downloadElement.href = href;
  downloadElement.download = `${this.upperCaseFirstLetter(
    dataType
  )}_Errors.csv`; //下载后文件名
  document.body.appendChild(downloadElement);
  downloadElement.click(); //点击下载
  document.body.removeChild(downloadElement); //下载完成移除元素
  window.URL.revokeObjectURL(href); //释放blob对象
}
