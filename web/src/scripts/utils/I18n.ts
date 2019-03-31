import "../../assets/locales/en.json";
import "../../assets/locales/ja.json";

type KV = { [key: string]: KV | string }
export class I18n {
  map!: KV;
  async init(lang: "en" | "ja") {
    if (lang !== "en" && lang !== "ja") {
      lang = "en";
    }
    const result = await import(`../../assets/locales/${lang}.json`);
    this.map = result;
    return t;
  }

  t(key: string): string {
    const keys = key.split(".");
    let tmp = this.map || {};
    for (const key of keys) {
      if (typeof tmp !== "string") {
        (tmp as KV | string) = tmp[key] || {};
      }
    }
    return typeof tmp === "string" ? tmp : key;
  }
}

const i18n = new I18n();

export async function init(lang: "en" | "ja") {
  return await i18n.init(lang);
}

export function t(key: string) {
  return i18n.t(key);
}
