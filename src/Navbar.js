import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return(
  <div>
        <nav class="navbar">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a href="#" class="nav-link">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="home" class="svg-inline--fa fa-home fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path class="fa-primary" fill="currentColor" d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z"></path></svg>
                <span class="link-text">Text1</span>
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="cog" class="svg-inline--fa fa-cog fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path class="fa-primary" fill="currentColor" d="M487.4 315.7l-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8 7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3L380.8 110c-17.9-15.4-38.5-27.3-60.8-35.1V25.8c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2 0-5.5 1.2-9.4 6.1-9.4 11.7V75c-22.2 7.9-42.8 19.8-60.8 35.1L88.7 85.5c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6 11.2 5.5 14L67.3 221c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6 1.5-5.5-.7-11.3-5.6-14.1zM256 336c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z"></path></svg>
                <span class="link-text">Text2</span>
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bicycle" class="svg-inline--fa fa-bicycle fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path class="fa-primary" fill="currentColor" d="M512.509 192.001c-16.373-.064-32.03 2.955-46.436 8.495l-77.68-125.153A24 24 0 0 0 368.001 64h-64c-8.837 0-16 7.163-16 16v16c0 8.837 7.163 16 16 16h50.649l14.896 24H256.002v-16c0-8.837-7.163-16-16-16h-87.459c-13.441 0-24.777 10.999-24.536 24.437.232 13.044 10.876 23.563 23.995 23.563h48.726l-29.417 47.52c-13.433-4.83-27.904-7.483-42.992-7.52C58.094 191.83.412 249.012.002 319.236-.413 390.279 57.055 448 128.002 448c59.642 0 109.758-40.793 123.967-96h52.033a24 24 0 0 0 20.406-11.367L410.37 201.77l14.938 24.067c-25.455 23.448-41.385 57.081-41.307 94.437.145 68.833 57.899 127.051 126.729 127.719 70.606.685 128.181-55.803 129.255-125.996 1.086-70.941-56.526-129.72-127.476-129.996zM186.75 265.772c9.727 10.529 16.673 23.661 19.642 38.228h-43.306l23.664-38.228zM128.002 400c-44.112 0-80-35.888-80-80s35.888-80 80-80c5.869 0 11.586.653 17.099 1.859l-45.505 73.509C89.715 331.327 101.213 352 120.002 352h81.3c-12.37 28.225-40.562 48-73.3 48zm162.63-96h-35.624c-3.96-31.756-19.556-59.894-42.383-80.026L237.371 184h127.547l-74.286 120zm217.057 95.886c-41.036-2.165-74.049-35.692-75.627-76.755-.812-21.121 6.633-40.518 19.335-55.263l44.433 71.586c4.66 7.508 14.524 9.816 22.032 5.156l13.594-8.437c7.508-4.66 9.817-14.524 5.156-22.032l-44.468-71.643a79.901 79.901 0 0 1 19.858-2.497c44.112 0 80 35.888 80 80-.001 45.54-38.252 82.316-84.313 79.885z"></path></svg>
                <span class="link-text">Text3</span>
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">
                 <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" class="svg-inline--fa fa-search fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path class="fa-primary" fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path></svg>
                <span class="link-text">Text4</span>
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="warehouse" class="svg-inline--fa fa-warehouse fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path class="fa-primary" fill="currentColor" d="M504 352H136.4c-4.4 0-8 3.6-8 8l-.1 48c0 4.4 3.6 8 8 8H504c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zm0 96H136.1c-4.4 0-8 3.6-8 8l-.1 48c0 4.4 3.6 8 8 8h368c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zm0-192H136.6c-4.4 0-8 3.6-8 8l-.1 48c0 4.4 3.6 8 8 8H504c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zm106.5-139L338.4 3.7a48.15 48.15 0 0 0-36.9 0L29.5 117C11.7 124.5 0 141.9 0 161.3V504c0 4.4 3.6 8 8 8h80c4.4 0 8-3.6 8-8V256c0-17.6 14.6-32 32.6-32h382.8c18 0 32.6 14.4 32.6 32v248c0 4.4 3.6 8 8 8h80c4.4 0 8-3.6 8-8V161.3c0-19.4-11.7-36.8-29.5-44.3z"></path></svg>
                <span class="link-text">Text5</span>
              </a>
            </li>
          </ul>
          
        </nav>
        <div id="page">
          <h1> Some sample text here</h1>
          <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pretium massa eu lorem molestie auctor. Curabitur vitae nulla accumsan, pretium augue id, volutpat lorem. Quisque ac ipsum laoreet, mollis mi sit amet, ultricies orci. Proin a ante ligula. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce volutpat eleifend sapien, eget vehicula nisl. Nullam feugiat ultrices neque ut ultricies. Phasellus velit leo, sodales nec malesuada nec, aliquam in ex. Maecenas id lectus sit amet nisi finibus condimentum. Maecenas non vulputate libero, a convallis purus. Aliquam vel nunc non lorem consectetur sagittis. Praesent eget pulvinar augue.

Sed leo urna, scelerisque eget magna eget, mattis accumsan erat. Donec venenatis, erat at gravida feugiat, urna libero pretium eros, sit amet rhoncus odio massa condimentum augue. Vivamus luctus at ex eget maximus. Duis leo erat, posuere at ultricies quis, tincidunt sagittis ligula. Mauris ac sagittis diam. Vestibulum risus diam, euismod et feugiat vel, cursus eu mauris. Ut id posuere quam, eget faucibus nunc. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi non erat ac ex pulvinar faucibus a vitae quam. Donec ac lacus facilisis, ultrices risus malesuada, dictum nisl. Suspendisse elementum, metus non lobortis placerat, ligula risus sodales ligula, at tempus sapien sem ac massa. Duis maximus gravida arcu sit amet dictum. Fusce faucibus, turpis non porta mattis, elit magna mattis quam, nec aliquam tellus tortor ut mauris. Etiam aliquam faucibus mauris vitae tempor. Donec magna eros, ullamcorper in eleifend vel, tincidunt nec velit.

Nunc sed ultrices nisl. Curabitur id laoreet augue. Aenean dignissim tincidunt pretium. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut eu orci massa. Nunc mauris quam, mattis nec purus sit amet, faucibus rhoncus nulla. Pellentesque vel semper enim. Nam non varius ante, a bibendum enim. Aliquam ac lectus blandit, commodo odio eget, auctor lacus. Integer nec rhoncus mi, facilisis blandit justo. Nulla hendrerit ipsum nisi, quis posuere nunc varius ut.

Maecenas placerat, lacus vel suscipit bibendum, quam leo posuere tortor, quis laoreet erat arcu ac arcu. Praesent porttitor arcu aliquet urna iaculis, eget placerat ante suscipit. Fusce ornare commodo nisl, ac vehicula magna interdum vitae. Aenean eu ipsum eros. Duis enim eros, tempus nec leo eget, feugiat fringilla est. In semper hendrerit varius. Aliquam erat volutpat. Nunc non turpis vitae lorem dapibus sollicitudin ac id erat. Sed eu quam id mauris euismod rhoncus in non tortor. Mauris molestie luctus commodo. Curabitur sem quam, consectetur quis interdum at, consequat ac ante. Fusce rhoncus nunc vitae accumsan venenatis. Fusce urna nulla, scelerisque et ornare non, varius sed ligula. Aenean tincidunt id sem non condimentum.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae nisl nulla. Aliquam eu nisl vitae nunc congue luctus. Praesent tincidunt, quam sed consequat placerat, nunc turpis auctor lectus, vel hendrerit ante ligula in mauris. Nulla urna justo, egestas vitae ligula a, sagittis volutpat purus. Etiam iaculis eu lorem eget gravida. Proin a tempor ipsum. Duis non diam id ligula sodales accumsan. Nulla pulvinar lorem eget finibus euismod. Sed vehicula semper sem eget bibendum. Quisque non mollis augue.</p>
        </div>
      </div>
  )
}

export default Navbar