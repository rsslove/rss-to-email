function cleanItem(item) {
  try {
    item.content = item.content.length < 5 ? '...' : item.content;
  } catch (e) {}

  try {
    item.title = item.title.replace(/\bhttps?:\/\/\S+/gi, "");
  } catch (e) {}

  return item;
}

module.exports = cleanItem;
