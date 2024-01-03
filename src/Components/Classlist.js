import React from 'react';
import '../Styles/Projectlist.css';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
function Classlist() {
  return (
    <div className='body-list'>
        <section class="app-list">
        <aside class="sidebar">
                <header>
                Class Name
            </header>
            <nav class="sidebar-nav">
        
            <ul>
                <li>
                <a href="#"><i class="ion-bag"></i> <span>Users</span></a>
                <ul class="nav-flyout">
                    <li>
                    <a href="#"><i class="ion-ios-color-filter-outline"></i>Manger1</a>
                    </li>
                    <li>
                    <a href="#"><i class="ion-ios-clock-outline"></i>Manger2</a>
                    </li>
                    <li>
                    <a href="#"><i class="ion-android-star-outline"></i>Manager3</a>
                    </li>
                </ul>
                </li>
                <li>
                <a href="#"><i class="ion-ios-settings"></i> <span class="">Tasks</span></a>
                <ul class="nav-flyout">
                    <li>
                    <a href="#"><i class="ion-ios-alarm-outline"></i>class1</a>
                    </li>
                    <li>
                    <a href="#"><i class="ion-ios-camera-outline"></i>Class2</a>
                    </li>
                    <li>
                    <a href="#"><i class="ion-ios-chatboxes-outline"></i>class3</a>
                    </li>
                    <li>
                    <a href="#"><i class="ion-ios-cog-outline"></i>class4</a>
                    </li>
                </ul>
                </li>
                <li>
                <a href="#"><i class="ion-ios-briefcase-outline"></i> <span class="">Users</span></a>
                <ul class="nav-flyout">
                    <li>
                    <a href="#"><i class="ion-ios-flame-outline"></i>User1</a>
                    </li>
                    <li>
                    <a href="#"><i class="ion-ios-lightbulb-outline"></i>User2</a>
                    </li>
                    <li>
                    <a href="#"><i class="ion-ios-location-outline"></i>User3</a>
                    </li>
                    <li>
                    <a href="#"><i class="ion-ios-locked-outline"></i>User4</a>
                    </li>
                    <li>
                    <a href="#"><i class="ion-ios-navigate-outline"></i>User5</a>
                    </li>
                </ul>
                </li>
            </ul>
            </nav>
        </aside>
        </section>
    </div>
  )
}

export default Classlist