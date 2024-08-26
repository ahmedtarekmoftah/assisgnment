export const showInfoPopup = (
  type,
  text,
  time = 4000,
  icon,
  onFinish = () => {}
) => ({
  type: "SHOW_INFO_POPUP",
  payload: type
    ? {
        text: text,
        type: type,
        time: time,
        iconName: icon,
        onFinish: onFinish,
      }
    : false,
});
