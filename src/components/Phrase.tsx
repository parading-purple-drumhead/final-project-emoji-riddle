import { PhraseProps } from "../utils/types";

const Phrase = ({ phrase }: PhraseProps) => {
  const phraseWords = phrase.split(" ");
  const phraseCodes = phraseWords.map((phraseWord) => {
    let phraseCode = "";
    for (let i = 0; i < phraseWord.length; i++) phraseCode += "_ ";
    return phraseCode.trim();
  });

  return (
    <>
      {phraseCodes.map((phraseCode, i) => (
        <span key={i} className="me-2">
          {phraseCode}&nbsp;&nbsp;
        </span>
      ))}
    </>
  );
};

export default Phrase;
