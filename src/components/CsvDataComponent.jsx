// import React, { useEffect, useState } from 'react';
// import { Translate } from '@google-cloud/translate';

// function LanguageTranslator() {
//   const [language, setLanguage] = useState('en');

//   useEffect(() => {
//     async function detectLanguage() {
//       const translate = new Translate();

//       const [detection] = await translate.detect('Hello world!');
//       const detectedLanguage = detection.language;

//       if (detectedLanguage === 'iw') {
//         setLanguage('he');
//       }
//     }

//     detectLanguage();
//   }, []);

//   return (
//     <div>
//       <h1>Google Translate Demo</h1>
//       <p>The detected language is: {language}</p>
//     </div>
//   );
// }

// export default LanguageTranslator;
