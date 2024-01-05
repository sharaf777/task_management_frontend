import React from 'react';
import '../Styles/Projectcreate.css'

function Usercreate() {
  return (
   <div className='form-body'>
        <div class="form">
          <div class="form-title">User Registeration </div>
          <div class="form-subtitle">Add your project user!</div>
          <div class="input-container ic1">
            <input id="firstname" class="input" type="text" placeholder=" " />
            <div class="cut">Class</div>
            <label for="firstname" class="placeholder">CLass name</label>
          </div>
          <div class="input-container ic2">
            <input id="email" class="input" type="text" placeholder=" " />
            <div class="cut ">User</div>
            <label for="email" class="placeholder">Add User</label>
          </div>
          <button type="text" class="submit">Add</button>
        </div>
    </div>
  )
}

export default Usercreate