import React from 'react';
import '../Styles/Projectcard.css';
//import { LightningBolt, Close, ArrowRight } from '@mui/icons-material';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { Link } from 'react-router-dom';

function Projectcard() {
  return (
  
      

<div class="card-container">
  <div class="card-columns">
  

    <div class="card border-0">
      <div class="position-relative">

      </div>
      <div class="card-body">
       <div class="del-icon"><DeleteIcon/></div>
        <h5 class="card-title">Project1</h5>
        <hr/>
        <p class="card-text">Minim dolor in amet nulla laboris enim dolore consequat proident fugiat culpa eiusmod proiden.</p>
      </div>
      <div class="card-footer">
        
          <div class="footerleft">Status bar</div>
          <div class="footerright">
            <div ><Link to="/Update-project"><SettingsSuggestIcon/></Link></div>
            <div ><Link to="/Add-manager"><PersonAddIcon/></Link></div> 
            <div ><Link to="/Add-manager"><PersonRemoveIcon/></Link></div> 
            <div ><Link to="/class"><ArrowRightAltIcon/></Link></div> 
        </div>
      </div>
    </div>

  </div>
</div>



  )
}

export default Projectcard