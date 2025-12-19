export const getIcons = async (id: string) => {
  const modules = await import(`../../vue-icons/${id}/index.mjs`);
  return modules;
};

export const copyTextToClipboard = (text: string) => {
  navigator.clipboard
    .writeText(text)
    .then(function () {
      console.log("已复制文本 " + text + " 到剪贴板");
      confirm("已复制文本 " + text + " 到剪贴板");
    })
    .catch(function (error) {
      console.error("复制失败", error);
      // alert("复制失败，请检查浏览器的权限设置");
    });
};
