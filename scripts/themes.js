export class Theme {
  constructor() {
    this.themes = [];
    this.themeColorRegex = /^§[(0-9a-f)*?]$/;
  }
  addTheme({
    name,
    successColor,
    errorColor,
    infoColor,
    defaultBracketColor,
    defaultRankColor,
    defaultNameColor,
    defaultMessageColor,
    barFull,
    barEmpty,
    barBracket,
    category,
    command,
    description,
    alias,
    descriptionText,
    warningColor
  }) {
    // awful array shit
    let allCorrect = [successColor, errorColor, infoColor, defaultBracketColor, defaultRankColor, defaultNameColor, defaultMessageColor, barFull, barEmpty, barBracket, category, command, description, alias, warningColor].every(col => /^§[(0-9a-f)*?]$/.test(col));
    if (allCorrect) {
      // add the theme
      this.themes.push({
        descriptionText,
        name,
        successColor,
        errorColor,
        infoColor,
        defaultBracketColor,
        defaultRankColor,
        defaultNameColor,
        defaultMessageColor,
        barFull,
        barEmpty,
        barBracket,
        category,
        command,
        description,
        alias,
        warningColor
      });
    }
  }
  getTheme(id) {
    // if theme id is higher than theme array length
    if (id >= this.themes.length) return this.themes[this.themes.length - 1];
    // if theme id is lower than 0
    else if (id < 0) return this.themes[0];
    // if none are true, return the theme
    else return this.themes[id];
  }
}