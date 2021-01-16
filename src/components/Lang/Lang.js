import {useSelector} from 'react-redux';

import translate from './translate';

const Lang = ({text}) => {
  const language = useSelector(state => state.language);
  const textTranslated = translate(text, language);
  return <>{textTranslated}</>;
}

export default Lang;

