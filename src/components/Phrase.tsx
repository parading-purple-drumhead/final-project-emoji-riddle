import { PhraseProps } from "../utils/types";

const Phrase = ({ phrase, show }: PhraseProps) => {
  const phraseWords = phrase.split(" ");
  const phraseLetters = phraseWords.map((phraseWord) => {
    let phraseLetter = "";
    for (let i = 0; i < phraseWord.length; i++)
      phraseLetter += `${phraseWord[i]} `;
    return phraseLetter.trim();
  });
  const phraseCodes = phraseWords.map((phraseWord) => {
    let phraseCode = "";
    for (let i = 0; i < phraseWord.length; i++) phraseCode += "_ ";
    return phraseCode.trim();
  });

  return (
    <>
      {!show &&
        phraseCodes.map((phraseCode, i) => (
          <>
            <span key={i} className="me-2">
              {phraseCode}
            </span>
            &nbsp;&nbsp;
          </>
        ))}
      {show &&
        phraseLetters.map((phraseWord, i) => (
          <>
            <span
              key={i}
              className="text-success me-2"
              style={{ textDecoration: "underline" }}
            >
              {phraseWord}
            </span>
            &nbsp;&nbsp;
          </>
        ))}
    </>
  );
};

export default Phrase;
