import { t, I18n } from "../I18n";

describe("I18n", () => {
  describe("#init", () => {
    it("should fetch resource", async () => {
      const i18n = new I18n();
      expect(await i18n.init("en")).toBe(t);
      expect(i18n.map).toMatchSnapshot();
    });
  });

  describe("#t", () => {
    const tests: { map: any, key: string, expected: string }[] = [
      {
        map: { foo: "bar" },
        key: "foo",
        expected: "bar",
      },
      {
        map: { foo: { bar: "baz" } },
        key: "foo.bar",
        expected: "baz",
      },
      {
        map: { foo: { foo: "baz" } },
        key: "foo.bar",
        expected: "foo.bar",
      },
      {
        map: {},
        key: "foo.bar",
        expected: "foo.bar",
      },
      {
        map: { foo: { bar: { baz: "baz" }} },
        key: "foo.bar",
        expected: "foo.bar",
      },
      {
        map: null,
        key: "foo.bar",
        expected: "foo.bar",
      },
    ];

    tests.forEach(({ map, key, expected }) => {
      it("should pass the test.", () => {
        const i18n = new I18n();
        i18n.map = map;
        expect(i18n.t(key)).toBe(expected);
      });
    });

    it("should replace __foo__ with text.", () => {
      const i18n = new I18n();
      i18n.map = { foo: "__foo__ bar" };
      expect(i18n.t("foo", { foo: "bar" })).toBe("bar bar");
    });
  });
});
