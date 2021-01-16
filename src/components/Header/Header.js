import {connect} from 'react-redux';

import {setLanguage} from '../../redux/actions/langActions';
import './Header.scss';

const mapStateToProp = (state) => {
   return {
     language: state.language
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
     setLanguageAction: (lang) => dispatch(setLanguage(lang))
   }
}

const Header = ({language, setLanguageAction}) => (
   <header>
      <div className="lang_menu">
         <button className={language === 'es' ? 'sel' : ''} onClick={() => setLanguageAction('es')}>Castellano</button>
         <button className={language === 'en' ? 'sel' : ''} onClick={() => setLanguageAction('en')}>English</button>
         <button className={language === 'eu' ? 'sel' : ''} onClick={() => setLanguageAction('eu')}>Euskera</button>
      </div>
      <h1>Do<span>∷</span>Today</h1>
   </header>
)

export default connect(mapStateToProp, mapDispatchToProps)(Header);