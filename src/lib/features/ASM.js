const ASM = {
  c: `
    c: Case-sensitive containment search.
    set: ["World War Two", "War is the enemy", "the weather is warm", "free extended warranty"]
    search: "war"
    result: ["the weather is warm", "free extended warranty"] 
    `,
  ic: `
    ic: Case-insensitive containment search.
    set: ["World War Two", "War is the enemy", "the weather is warm", "free extended warranty"]
    search: "war"
    result: ["World War Two", "War is the enemy", "the weather is warm", "free extended warranty"]
    `,
  e: `
    e: Exact match search.
    set: ["Help them.", "Help them", "help them", "help"]
    search: "Help them"
    result: ["Help them"]
    `,
  ie: `
    ie: Case-insensitive exact match search.
    set: ["Help them.", "Help them", "help them", "help"]
    search: "Help them"
    result: ["Help them", "help them"]
    `,
  sw: `
    sw: Case-sensitive starts-with search.
    set: ["apples and orange", "the app is running", "application accepted", "Apparently,"]
    search: "app"
    result: ["apples and orange", "application accepted"]
    `,

  isw: `
    isw: Case-insensitive starts-with search.
    set: ["apples and orange", "the app is running", "application accepted", "Apparently,"]
    search: "app"
    result: ["apples and orange", "application accepted", "Apparently,"]
    `,
  ew: `
    ew: Case-sensitive ends-with search.
    set: ["man playing", "what a man", "went with a fisherman", "he was the Man"]
    search: "man"
    result: ["what a man", "went with a fisherman"]
    `,

  iew: `
    iew: Case-insensitive ends-with search.
    set: ["man playing", "what a man", "went with a fisherman", "he was the Man"]
    search: "man"
    result: ["what a man", "went with a fisherman", "he was the Man"]
    `,
  ph: `
    ph: Phrase search.
    The search's terms are treated as a single phrase. They don't get treated as separate words.
    In theory, the search: "good luck" would give different result that "luck good"
    `,
  eng: `
    eng: English search.
    This uses the English language parser to translate the terms into a search query object
    that the database compares to a search vector. Stop words are omitted and each term 
    is treated as keyword.
    `,
  def: `
    def: Default search.
    Your go-to method. Works with valid words. Don't use partial words like
    "hel" for "help", in this case use -c- or -ic- modes!
    `,
};

export default ASM;
