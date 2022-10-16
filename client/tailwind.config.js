/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./*/*.vue", "./*/*/*.vue", "./*/*/*/*.vue"],
  theme: {
    backdropFilter: {
      none: "none",
      blur: "blur(20px)",
    },
    extend: {
      backgroundSize: {
        "size-200": "200% 200%",
      },
      backgroundPosition: {
        "pos-0": "0% 0%",
        "pos-100": "100% 100%",
      },
      colors: {
        purp: {
          DEFAULT: "#6755ED",
          50: "#9F93F4",
          100: "#988CF3",
          200: "#8C7FF1",
          300: "#8071F0",
          400: "#7363EE",
          500: "#6755ED",
          600: "#5B47EC",
          700: "#4E39EA",
          800: "#422BE9",
          900: "#361EE7",
        },
        wattle: {
          DEFAULT: "#DBC944",
          50: "#E6DA7E",
          100: "#E5D877",
          200: "#E2D46A",
          300: "#E0D05E",
          400: "#DDCD51",
          500: "#DBC944",
          600: "#D9C537",
          700: "#D6C22A",
          800: "#CAB727",
          900: "#BDAB24",
        },
        sorbus: {
          DEFAULT: "#FC7B03",
          50: "#FD9F47",
          100: "#FD9B3F",
          200: "#FD9330",
          300: "#FC8B21",
          400: "#FC8312",
          500: "#FC7B03",
          600: "#ED7403",
          700: "#DE6C03",
          800: "#CF6502",
          900: "#C05D02",
        },
        turquoise: {
          DEFAULT: "#2CC8D4",
          50: "#65D7E0",
          100: "#5FD5DE",
          200: "#52D2DC",
          300: "#45CFD9",
          400: "#39CBD7",
          500: "#2CC8D4",
          600: "#29BDC8",
          700: "#26B1BB",
          800: "#24A5AF",
          900: "#2199A2",
        },
        orchid: {
          DEFAULT: "#DB44D9",
          50: "#E67EE5",
          100: "#E577E3",
          200: "#E26AE1",
          300: "#E05EDE",
          400: "#DD51DC",
          500: "#DB44D9",
          600: "#D937D6",
          700: "#D62AD4",
          800: "#CA27C8",
          900: "#BD24BB",
        },

        blue: {
          DEFAULT: "#4287F5",
          50: "#83B1F8",
          100: "#7CACF8",
          200: "#6EA3F7",
          300: "#5F99F7",
          400: "#5190F6",
          500: "#4287F5",
          600: "#337EF4",
          700: "#2575F3",
          800: "#166BF3",
          900: "#0D63ED",
        },
        winkle: {
          DEFAULT: "#BCCEE3",
          50: "#EDF2F7",
          100: "#E7EEF5",
          200: "#DCE6F1",
          300: "#D2DEEC",
          400: "#C7D6E8",
          500: "#BCCEE3",
          600: "#B1C6DE",
          700: "#A6BEDA",
          800: "#9CB6D5",
          900: "#91AED1",
        },
        silver: {
          DEFAULT: "#B8B8B8",
          50: "#DADADA",
          100: "#D7D7D7",
          200: "#CFCFCF",
          300: "#C7C7C7",
          400: "#C0C0C0",
          500: "#B8B8B8",
          600: "#B0B0B0",
          700: "#A9A9A9",
          800: "#A1A1A1",
          900: "#999999",
        },
        flush: {
          DEFAULT: "#D14545",
          50: "#DF7C7C",
          100: "#DD7676",
          200: "#DA6A6A",
          300: "#D75E5E",
          400: "#D45151",
          500: "#D14545",
          600: "#CE3939",
          700: "#C63131",
          800: "#BA2E2E",
          900: "#AE2B2B",
        },
        emerald: {
          DEFAULT: "#3AD64F",
          50: "#73E282",
          100: "#6DE17C",
          200: "#60DE71",
          300: "#53DB66",
          400: "#47D95A",
          500: "#3AD64F",
          600: "#2DD344",
          700: "#2AC83F",
          800: "#27BB3B",
          900: "#24AE37",
        },
        apple: {
          DEFAULT: "#35BD47",
          50: "#75D882",
          100: "#6DD67B",
          200: "#5DD26D",
          300: "#4ECD5E",
          400: "#3EC950",
          500: "#35BD47",
          600: "#2FA940",
          700: "#2A9538",
          800: "#248131",
          900: "#1F6D29",
        },
        steel: {
          DEFAULT: "#24222E",
          50: "#433F56",
          100: "#403C51",
          200: "#393648",
          300: "#322F40",
          400: "#2B2937",
          500: "#24222E",
          600: "#1D1B25",
          700: "#16151C",
          800: "#0F0E14",
          900: "#08080B",
        },
      },
    },
  },
  plugins: [require("tailwindcss-filters")],
};
