export const getIcons = async (id: string) => {
  const modules = await import(
    `../../vue-icons/icons/${id}/index.mjs`
  );
  return modules
};


export const copyTextToClipboard = (text) => {
  navigator.clipboard.writeText(text).then(function () {
    alert("已复制文本到剪贴板");
  }).catch(function (error) {
    console.error('复制失败', error);
    alert("复制失败，请检查浏览器的权限设置");
  });
}

