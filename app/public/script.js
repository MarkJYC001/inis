// let name = prompt("Your name?");
let name = "JYC"+Math.round(Math.random()*100);

// database of firebase, and maybe server from heroko
let socket, database, DBpointer,DBteleport;

// preload and use the image
var character_imgs,
  character_img,
  mouse_icon1,
  mouse_icon2,
  map1,
  map1_px,
  UI1,
  object1,
  n_maps,
  c_maps,
  p_maps,
  characterPic,
  character_direction_code=0;

//let character_i1,
//    character_i2;

function preload() {
  //character_i1 = loadGif("https://cdn.glitch.global/8c78188e-707a-453a-ad58-3e3b2bd9dc2c/Untitled%2007-23-2023%2003-37-01.gif?v=1690681523669")
  //character_i2 = loadGif("https://cdn.glitch.global/8c78188e-707a-453a-ad58-3e3b2bd9dc2c/Front.gif?v=1690681523952")
  character_img = loadImage(
    "https://cdn.glitch.global/404a045a-c159-4894-8c87-4727626322d6/WX20230614-110829%402x.png?v=1686810784517"
  ); // 可以load 不能用？
  mouse_icon1 = loadImage(
    "https://cdn.glitch.global/404a045a-c159-4894-8c87-4727626322d6/images.png?v=1686810781191"
  );
  mouse_icon2 = loadImage(
    "https://cdn.glitch.global/404a045a-c159-4894-8c87-4727626322d6/mouse_pointer_icon.png?v=1686811132239"
  );
  //map1 = loadImage(
  //"https://cdn.glitch.global/404a045a-c159-4894-8c87-4727626322d6/test_case_for_map.jpeg?v=1687014065434"
  //);
  //map1_px = loadImage(
  //  "https://cdn.glitch.global/7676d2e9-40f6-489c-bd26-72d2c8887965/WX20230628-104218%402x.png?v=1688457587919"
  //);
  n_maps = {};
  // Here it should be the navigation map?
  n_maps["B2"] = loadImage(
    "https://cdn.glitch.global/8b629a38-f25a-4581-8cd6-8781d8247d4f/nv.PNG?v=1689740475966"
  );
  n_maps["B1"] = loadImage(
    "https://cdn.glitch.global/7676d2e9-40f6-489c-bd26-72d2c8887965/WechatIMG425.jpeg?v=1688958724886"
  );
  //n_maps["4F"] = loadImage(
  //  "https://cdn.glitch.global/7676d2e9-40f6-489c-bd26-72d2c8887965/WechatIMG428.jpeg?v=1688959548527"
  //);

  // And there may also have to be one character version map
  c_maps = {};
  c_maps["B2"] = loadImage(
    // This is the version where you can see the p_map
    //"https://cdn.glitch.global/aedf9c5b-cf07-44f1-8428-cd6b84244adc/pix%E7%9A%84%E5%89%AF%E6%9C%AC2.PNG?v=1690768829048"

    // This is the pure character map without furniture, but the collision is not according to this
    //  "https://cdn.glitch.global/404a045a-c159-4894-8c87-4727626322d6/ch.PNG?v=1690885500638"

    // This is a map with furnitures
    "https://cdn.glitch.global/404a045a-c159-4894-8c87-4727626322d6/ch%E7%9A%84%E5%89%AF%E6%9C%AC.PNG?v=1690885571094"
  );
  c_maps["B1"] = loadImage(
    // "https://cdn.glitch.global/7676d2e9-40f6-489c-bd26-72d2c8887965/WechatIMG425.jpeg?v=1688958724886"
    "https://cdn.glitch.global/404a045a-c159-4894-8c87-4727626322d6/test_case_for_map.jpeg?v=1687014065434"
  );

  p_maps = {};
  p_maps["B2"] = loadImage(
    "https://cdn.glitch.global/404a045a-c159-4894-8c87-4727626322d6/pix%E7%9A%84%E5%89%AF%E6%9C%AC2.PNG?v=1690885477816"
    //"https://cdn.glitch.global/8c78188e-707a-453a-ad58-3e3b2bd9dc2c/pix%E7%9A%84%E5%89%AF%E6%9C%AC.PNG?v=1690629508526"
    //"https://cdn.glitch.global/8b629a38-f25a-4581-8cd6-8781d8247d4f/pix.PNG?v=1689740477190"
  );
  p_maps["B1"] = loadImage(
    //"https://cdn.glitch.global/aedf9c5b-cf07-44f1-8428-cd6b84244adc/pix%E7%9A%84%E5%89%AF%E6%9C%AC2.PNG?v=1690768829048"
    "https://cdn.glitch.global/404a045a-c159-4894-8c87-4727626322d6/test_case_for_map.jpeg?v=1687014065434"
  );

  characterPic = [loadImage("https://cdn.glitch.global/404a045a-c159-4894-8c87-4727626322d6/front1.PNG?v=1690948972295"
  ),loadImage(
    "https://cdn.glitch.global/404a045a-c159-4894-8c87-4727626322d6/front%202.PNG?v=1690948977459"
  ),loadImage("https://cdn.glitch.global/404a045a-c159-4894-8c87-4727626322d6/front3.PNG?v=1690948979395"), //f3
    loadImage(
    "https://cdn.glitch.global/404a045a-c159-4894-8c87-4727626322d6/back1.PNG?v=1690948986107"
  ),loadImage(
    "https://cdn.glitch.global/404a045a-c159-4894-8c87-4727626322d6/back2.PNG?v=1690948987283"
  ),loadImage(
    "https://cdn.glitch.global/404a045a-c159-4894-8c87-4727626322d6/back3.PNG?v=1690948988974"
  ),loadImage(
    "https://cdn.glitch.global/404a045a-c159-4894-8c87-4727626322d6/left1.PNG?v=1690948991144"
  ),loadImage(
    "https://cdn.glitch.global/404a045a-c159-4894-8c87-4727626322d6/left2.PNG?v=1690948993081"
  ),loadImage(
    "https://cdn.glitch.global/404a045a-c159-4894-8c87-4727626322d6/left3.PNG?v=1690948995238"
  ),loadImage(
    "https://cdn.glitch.global/404a045a-c159-4894-8c87-4727626322d6/right1.PNG?v=1690948997227"
  ), loadImage(
    "https://cdn.glitch.global/404a045a-c159-4894-8c87-4727626322d6/right2.PNG?v=1690949001931"
  ),loadImage(
    "https://cdn.glitch.global/404a045a-c159-4894-8c87-4727626322d6/right3.PNG?v=1690949004061"
  )
  ]
   // following this [f1,f2,f2,b1,b2,b3,l1,l2,l3,r1,r2,r3]
   // characterPic["front1"] = 
  



}
//preload images end

// 变化参数 i 有助于变色 variable i helps with the change of color
var i = 0;
//function prelaod(){

//}

// May concern about local and global, basic settings put here
var Canvas_lenth; //  = window.innnerWidth;//windowWidth;//1280; // windowWidth;///windowWidth; // built-in functionf for window size
var Canvas_width; //  = window.innerHeight;//640;///windowHeight;
var character = {
  Radium: 50, // use circle in the demo, useless if we use the image instead

  X: 0, //Canvas_lenth / 2,  // given the canva size window.inner"size"*0.8
  Y: 0, //Canvas_width / 2,
  Name: name,

  // first way of movement
  choosen: false,
  dest_x: Canvas_lenth / 2,
  dest_y: Canvas_width / 2,
  dflag: false,
  v: 10,

  // second way of movement(keyboard - non-reversed)
  df: true,
  d_x: 0,
  d_y: 0,
  dv: 10,

  // third way of movement(keyboard - reversed: map move instead)
  c_w: 64,
  c_h: 64,
  c_perc: 0.8,
  huge_flag: true,

  d1_f: false,
  d1_x: 0,
  d1_y: 0,
};

//This is an initial position
var map_id = {
  floor: "B2",
  // relative position of the character, given the fixed position on screen:   X: Canvas_lenth / 2; Y: Canvas_width / 2
  // using a fliped x-y axis with (0,0) at the left-head
  r_x: 515,
  r_y: 1200,

  // the percentage of map image being squeezed or scratched
  perc: 1,
  // px_perc: 680 / 1706,
  // here it should follow the formula:
  // relative_percentage_on_1_time_map + map_postion = screen_centre
  // (r_x * percentage)  + map.x = Canvas_lenth/ 2 (fixed point on the screen)
}; // Here it should be the model for all the maps, so do the objects

// variables for the navigations
// Notice that in order not to be influenced by the screen size,
// the points are gotten from the character map([r_x. r_y]) and calculated according to the proportion
var points = {
  B2: [
    [135, 1160],
    [2000, 1160],
    [2685, 1160],
    [3875, 1160],
    [4555, 1160],
    [6225, 1160],
    [6225, 1500],
    [6225, 2280],
    [6225, 2500],
    [6225, 3000],
    [6225, 3630],
    [5112, 3630],
    [4555, 3630],
    [3689, 3630],
    [3127, 3630],
    [2565, 3630],
    [705, 3630],
    [535, 3630],
    [535, 4682],
    [535, 5970],
    // [1645, 5970],
  ],
};

// var maps = [map1];
var foot_y, map_X, map_Y, talk, talk_flag, elevator_flag, p_flag;
p_flag = false;
elevator_flag = false;

//let objects = {
//  r_x: 300,   // r_x,r_y pointing to the right bottom
//  r_y: 300,
//  perc: 0.1,

//};
var objects_detail = [
  [300, 300, 0.2],
  [300, 380, 0.2],
  [300, 460, 0.2],
  [300, 540, 0.2],
];
// boundary for movements
var move4;

// setup for a huge interaction system
var u_id = 0;
var user_list = {
  names: [name],
  sockets: [], // Here it is not yet defined
  floors: [map_id.floor],
  positions: [[map_id.r_x, map_id.r_y]],
  // following the rule of floor, r_x, r_y
  // Here it just represents the r_x and r_y
  talks: [""],
  directions:[1],
  speeds:[[0,0]],
  // images:[], // different pictures? in order to distinguish between users
};

// space for  html/css elements, as we hope it to be global and changeable
var div1, layout_button, canvas; // = createDiv("Canvas")

// Trial about the socket stuff
socket = io.connect();
user_list.sockets.push(socket.id);

sendViaSocket({
  action: "login",
  name: name,
  floor: user_list.floors[0],
  position: user_list.positions[0],
  talk: user_list.talks[0],
  socket: socket.id,
  direction:1,
  speed:[0,0]
});

// In order not to have some unexpected situation, here is a clarification
if (name == "clarification") {
  sendViaSocket({ action: "initialization", user_list: user_list });
}
// console.log(socket);
socket.on("connection_name", receiveViaSocket);
// imageMode(CENTER);
//image(character_img, character.X, character.Y);  // setup也OK，但是不能动？
// image(character_img, character.X, character.Y)

var set = false; // So that the window_resized while not be activated first
var n_map,
  new_width,
  new_height,
  c_map,
  n_c_perc,
  m_points,
  n_i1,
  n_i2,
  path,
  navigation_id,
  nmove_flag;
nmove_flag = true;
new_width = 0;
new_height = 0;

function setup() {
  setupDB();
  console.log(firebase);
  clearDBReference("teleport")
  DBteleport = getDBReference("teleport");
  


  //layout_button = createButton("Layout change")
  //layout_button.position(100,100)
  //layout_button.mousePressed(layout_change)
  //div1 = createDiv("Canvas")

  Canvas_lenth = window.innerWidth;
  Canvas_width = window.innerHeight * 0.9;

  frameRate(60);

  move4 = {
    left: Canvas_lenth * 0.1,
    right: Canvas_lenth * 0.9,
    up: Canvas_width * 0.1,
    down: Canvas_width * 0.9,
  };
  character.X = Canvas_lenth / 2;
  character.Y = Canvas_width / 2;

  canvas = createCanvas(Canvas_lenth, Canvas_width); //windowWidth*0.8,windowHeight*0.8);
  canvas.parent("canvas");
  canvas.position(0, 0);

  n_map = n_maps[user_list.floors[u_id]];

  if ((n_map.height * Canvas_lenth) / n_map.width < Canvas_width) {
    n_c_perc = Canvas_lenth / n_map.width;
    // fill the lenth direction
    new_height = n_map.height * n_c_perc;
    image(n_map, 0, 0, Canvas_lenth, new_height);
  } else {
    // fill the height direction
    n_c_perc = Canvas_width / n_map.height;
    new_width = n_map.width * n_c_perc;
    image(n_map, 0, 0, new_width, Canvas_width);
  }
  //character_i1.play()
}

// function draw block starts
// function draw block starts

//var character_direction_code = 1;

function draw() {
  
  if (i > 30) {
    //console.log(user_list.speeds)
    //set = true;
    // A bug that the resize() would be accidentally point out
    i = 0;
  } else {
    i++;
    // map_id.perc = 0.5 + i * 0.001; -- a possible way of zoom in
  }

  // remember that this is a infinite loop
  // something intesting is here
  if (i % 2 == 0) {
    //background(255,0,0)
  } else {
    //background(0,255,0)
  }

  background(220);
  // neccessary to update the canvas, otherwise there would be "shadows"

  if (character.huge_flag) {
    // A third way of movement when map is larger than the screen

    // map, and it should move at the opposite direction with the character
    character.dflag = false;
    character.choosen = false;
    background(220);
    imageMode(CORNER);
    // default: left-upper corner

    // image(map1, map1_id.x, 100)
    // used for testing

    
    let speed_x = character.d_x + character.d1_x;
    let speed_y = character.d_y + character.d1_y;

    
    map_id.r_x += speed_x;
    map_id.r_y += speed_y; // we even don't need to rewrite it again

    // console.log([map_id.r_x, map_id.r_y])
    var character_screen_width = character.c_w * character.c_perc * map_id.perc;
    var character_screen_height =
      map_id.perc * character.c_perc * character.c_h;
    foot_y = map_id.r_y + speed_y
    // The function about the walls
    // Use foot to check
    walls();

    user_list.positions[u_id] = [map_id.r_x, map_id.r_y];
    // These two will not appear at the same time: new_height, new_width, but either will appear

    // console.log([character.X, character.Y])
    // See which one is missing
    
    // This achieved connection of the two maps
    // if (new_width == 0){     No need

    character.X = map_id.r_x * n_c_perc;
    // Here should be some issue as the two pictures are the same size
    // These propotion should be same new_height / c_map.height ==  Canvas_lenth / c_map.width
    character.Y = map_id.r_y * n_c_perc;
    // }else{

    // }

    map_X = Canvas_lenth / 2 - map_id.r_x * map_id.perc;
    map_Y = Canvas_width / 2 - map_id.r_y * map_id.perc;
    // const img = maps[0];

    if (p_flag) {
      c_map = p_maps[user_list.floors[u_id]];
    } else {
      c_map = c_maps[user_list.floors[u_id]];
    }
    image(
      c_map,
      map_X,
      map_Y,
      c_map.width * map_id.perc,
      c_map.height * map_id.perc
    );
    setLineDash([]);
    if (character.d1_f && key_flag) {
      Move4();
    } // may conflict with mouse movement
    else {
      (character.d1_x = 0), (character.d1_y = 0);
    }
    // here it should follow the formula:
    // relative_percentage_on_1x_map + map_postion = screen_center
    // (r_x * percentage)  + map.x = Canvas_lenth/ 2 (fixed point on the screen)
    //
    //

    // The foot is also calculatable, using r_y and size of the character image
    // The position of one object: map_X + object.r_x * map_id.perc
    // We can use a for loop here in determining the levels
    // for (i = 0;i < 3;i++){
    //}

    // Here we create a model of having only one object

    // drawText(foot_y)
    ///

    //character direction control block starts
    //character direction control block starts

    if (speed_x != 0 || speed_y != 0) {
      if (Math.abs(speed_y) >= Math.abs(speed_x) * 0.6) {
        // according to the proportion 
        if (speed_y > 0) {
          character_direction_code = 0;
        } else if (speed_y < 0) {
          character_direction_code = 1;
        }
      } else {
        if (speed_x < 0) {
          character_direction_code = 2;
        } else if (speed_x > 0) {
          character_direction_code = 3;
        }
      }

    }
    user_list.directions[u_id] = character_direction_code
    user_list.speeds[u_id] = [speed_x,speed_y]
    sendViaSocket({
        action: "move",
        u_id: u_id,
        position:[map_id.r_x, map_id.r_y],
        direction: character_direction_code,
        speed:[speed_x,speed_y]
      });
    
     if (speed_y == 0 && speed_x == 0) {
        imageMode(CENTER);
        image(
          characterPic[3*character_direction_code],
          Canvas_lenth / 2,
          Canvas_width / 2,
          character_screen_width,
          character_screen_height
        );

     }else{
       var timi = Math.round(i / 30)// time variable to have the character moving
        imageMode(CENTER);
        image(
            characterPic[3*character_direction_code+timi],
            Canvas_lenth / 2,
            Canvas_width / 2,
            character_screen_width,
            character_screen_height
          );

     }


    
    //character direction control block ends
    //character direction control block ends

    // character_i1
    textAlign(CENTER);

    textSize(20);
    stroke(255);
    strokeWeight(1);
    fill("white");
    text(character.Name, Canvas_lenth / 2, Canvas_width / 2 - character.Radium);
    if (talk_flag) {
      // What if it is too long?
      rectMode(CENTER);
      fill("white");
      rect(
        Canvas_lenth / 2,
        Canvas_width / 2 - character.Radium - 25,
        talk.length * 20,
        50
      );
      fill(0);
      text(talk, Canvas_lenth / 2, Canvas_width / 2 - character.Radium - 25);
    }

    // Here is a space for the elevator
    if (elevator_flag) {
      textAlign(CENTER);
      textSize(40);
      text(
        "Here we approached a elevator, press the mouse to go to the floor you want.",
        Canvas_lenth / 2,
        Canvas_width - 100
      );
      // elevator()  // Is executed in a loop
      // elevator_flag = false
    }

    // Here is the position for all the other users
    for (let j = 0; j < user_list.names.length; j++) {
      // Here j is the user_id for user j
      if (user_list.floors[j] == user_list.floors[u_id] && j != u_id) {
        var ur_x = user_list.positions[j][0];
        var ur_y = user_list.positions[j][1];
        var screen_x = Canvas_lenth / 2 - (map_id.r_x - ur_x) * map_id.perc;
        var screen_y = Canvas_width / 2 - (map_id.r_y - ur_y) * map_id.perc;
        var user_width = 64 * character.c_perc * map_id.perc;
        var user_height = 64 * character.c_perc * map_id.perc;
        
        // something about the directions
        
        var ur_direction = user_list.directions[j];
        var ur_sx = user_list.speeds[j][0]
        var ur_sy = user_list.speeds[j][1]
        
        if (ur_sy == 0 && ur_sx == 0) {
        imageMode(CENTER);
        image(
          characterPic[3*ur_direction],
          screen_x,
          screen_y,
          user_width,
          user_height
            );

         }else{
         var timi = Math.round(i / 30)// time variable to have the character moving
          imageMode(CENTER);
          image(
              characterPic[3*ur_direction+timi],
              screen_x,
              screen_y,
              user_width,
              user_height
            );

             }

        //image(
        //  character_img,
        //  screen_x,
        //  screen_y,
        //  user_width,
        //  user_height
          // Now it is same, but what if we want more character?
        //);
        fill(255);
        textAlign(CENTER);
        textSize(20);
        // Here j is the u_id of the other users
        text(user_list.names[j], screen_x, screen_y - (user_height * 2) / 3);

        // text bubble
        if (user_list.talks[j] != "") {
          var words = user_list.talks[j];
          rectMode(CENTER);
          fill("white");
          rect(
            screen_x,
            screen_y - character.Radium - 25,
            words.length * 20,
            50
          );
          fill(0);
          text(words, screen_x, screen_y - character.Radium - 25);
        }
      }
    }

    // objects();

    // orignal_size:214×252, here you must write img, otherwise it can not be load

    // The canvas is a fliped x-y plot

    // you can actually choose whether to change its value, or just use image()
  } else {
    imageMode(CORNER);
    // in order to make the map smaller than the screen

    // var key = "B1"  In this case, we can reuse this code for other
    n_map = n_maps[user_list.floors[u_id]];
    m_points = points[user_list.floors[u_id]];
    //console.log(m_points)

    if ((n_map.height * Canvas_lenth) / n_map.width < Canvas_width) {
      // fill the lenth direction
      var new_height = (n_map.height * Canvas_lenth) / n_map.width;
      image(n_map, 0, 0, Canvas_lenth, new_height);
    } else {
      // fill the height direction
      var new_width = (n_map.width * Canvas_width) / n_map.height;
      image(n_map, 0, 0, new_width, Canvas_width);
    }

    // whole_path(m_points)

    character.df = false;
    // moving method2
    if (character.df) {
      character.X += character.d_x;
      character.Y += character.d_y;
    }
    character.df = true;

    // Moving method 1
    if (character.dflag) {
      fill("red");
      circle(character.dest_x, character.dest_y, 10);
      // fill("white")

      fill("white");
      stroke(255);
      strokeWeight(1);
      // Flashmove()
      // navigation()
      // console.log(path)
      stroke("purple");
      strokeWeight(1);
      for (let j = 0; j < path.length; j++) {
        if (j == 0) {
          if (navigation_id == 0) {
            line(character.X, character.Y, path[j][0], path[j][1]);
          }
        } else {
          line(path[j - 1][0], path[j - 1][1], path[j][0], path[j][1]);
          if (j == path.length - 1) {
            // this should be another more line
            line(character.dest_x, character.dest_y, path[j][0], path[j][1]);
          }
        }
        text(j, path[j][0], path[j][1]);
      }
      textAlign(CENTER);
      textSize(50);
      text(
        "Press n to stop the moving and see the navigaiton",
        Canvas_lenth / 2,
        Canvas_width - 100
      );
      if (nmove_flag) {
        navigation_move(navigation_id);
      }

      //circle(character.X, character.Y, character_img.height * character.c_perc * n_c_perc/2);

      //textSize(20);
      //text(n_i2, m_points[n_i2][0] * n_c_perc, m_points[n_i2][1] * n_c_perc);
      // Flashmove()
      //Move1()

      // This achieved connection of the two maps
      // if (new_width == 0){     No need

      map_id.r_x = character.X / n_c_perc;
      // Here should be some issue as the two pictures are the same size
      // These propotion should be same new_height / c_map.height ==  Canvas_lenth / c_map.width
      map_id.r_y = character.Y / n_c_perc;
      user_list.positions[u_id] = [map_id.r_x, map_id.r_y];
      // These two will not appear at the same time: new_height, new_width, but either will appear

      // console.log([map_id.r_x,map_id.r_y])
      // See which one is missing
      sendViaSocket({
        action: "move",
        u_id: u_id,
        position: [map_id.r_x, map_id.r_y],
        direction:1,
        speed:[0,0],
      });

      // See whether this would be good? Only renew when position is set
    } else {
    }
    if (character.choosen) {
      if (i > 15) {
        //background(255,0,0)
        fill("pink");
        setLineDash([10, 10]);
      } else {
        //background(0,255,0)
        fill("white");
        setLineDash([]);
      }
      stroke(255);
      strokeWeight(1);
      circle(
        character.X,
        character.Y,
        character_img.height * character.c_perc * n_c_perc * 5
      );

      fill("white");
      //textSize(20);
      //text(n_i1, m_points[n_i1][0] * n_c_perc, m_points[n_i1][1] * n_c_perc);
      // nearest point
    }
    fill("white");
    noStroke();

    // circle(character.X,character.Y,character.Radium) // use image instead

    imageMode(CENTER);
    image(
      character_img,
      character.X,
      character.Y,
      character_img.width * character.c_perc * n_c_perc * 5,
      character_img.height * character.c_perc * n_c_perc * 5
    );
    // orignal_size:214×252, here you must write img, otherwise it can not be load

    textAlign(CENTER);
    textSize(20);
    strokeWeight(1);
    setLineDash([]);
    stroke(255);
    fill(255);
    text(
      character.Name,
      character.X,
      character.Y - character_img.height * character.c_perc * n_c_perc
    );
    // The canvas is a fliped x-y plot
  }
  imageMode(CORNER);

  // This is a part for mouse position when not neccessarily pressed
  if (character.choosen && !character.dflag) {
    image(mouse_icon1, mouseX, mouseY, 20, 20); //  225×225
  } else {
    image(mouse_icon2, mouseX, mouseY, 22, 33); //  111×163
  }

  // for mouse, you can directly use mouseX, mouseY, and we can change the icons:
}

function Move1() {
  fill(255);
  // strokeWeight(1)
  line(character.X, character.Y, character.dest_x, character.Y);
  line(character.dest_x, character.Y, character.dest_x, character.dest_y);
  // broken line
  // fill("red");
  // circle(character.dest_x, character.dest_y, 10);

  // Now it starts to move
  if (
    -character.v < character.X - character.dest_x &&
    character.X - character.dest_x < character.v
  ) {
    if (
      -character.v < character.Y - character.dest_y &&
      character.Y - character.dest_y < character.v
    ) {
      character.dflag = false;
      character.choosen = false;
    } else {
      if (character.Y > character.dest_y) {
        character.Y -= character.v;
      } else {
        character.Y += character.v;
      }
    }
  } else {
    if (character.X > character.dest_x) {
      character.X -= character.v;
    } else {
      character.X += character.v;
    }
  }
  // Because move1() is only activated in navigation model
  // But the this depends on the main loop to work, so every step would trigger this
}

function navigation_move(id) {
  var v = character.v * n_c_perc * 2; // why
  // there are two situations, either y axis same or x axis are same
  if (id == path.length) {
    // (1) --> [character.dest_x, character.dest_y]
    if (
      -v <= character.Y - character.dest_y &&
      character.Y - character.dest_y <= v &&
      -v <= character.X - character.dest_x &&
      character.X - character.dest_x <= v
    ) {
      character.X = character.dest_x;
      character.Y = character.dest_y;
      character.dflag = false;
      character.choosen = false;
    } else if (character.Y == character.dest_y) {
      if (character.X < character.dest_x) {
        character.X += v;
      } else {
        character.X -= v;
      }
    } else {
      if (character.Y < character.dest_y) {
        character.Y += v;
      } else {
        character.Y -= v;
      }
    }
  } else {
    // first see wether approached
    if (
      -v <= character.Y - path[id][1] &&
      character.Y - path[id][1] <= v &&
      -v <= character.X - path[id][0] &&
      character.X - path[id][0] <= v
    ) {
      character.X = path[id][0];
      character.Y = path[id][1];
      navigation_id = navigation_id + 1;
      // console.log(["approached, and aheading", , navigation_id, path]);
    } else if (character.Y == path[id][1]) {
      if (character.X < path[id][0]) {
        character.X += v;
      } else {
        character.X -= v;
      }
    } else {
      if (character.Y < path[id][1]) {
        character.Y += v;
      } else {
        character.Y -= v;
      }
    }
  }
}

// This one serves the movement in navigation mode
function Flashmove(x, y) {
  character.X = x; //character.dest_x;
  character.Y = y; //character.dest_y;
  //character.dflag = false;
  //character.choosen = false;

  map_id.r_x = character.X / n_c_perc;
  // Here should be some issue as the two pictures are the same size
  // These propotion should be same new_height / c_map.height ==  Canvas_lenth / c_map.width
  map_id.r_y = character.Y / n_c_perc;
  user_list.positions[u_id] = [map_id.r_x, map_id.r_y];
  // These two will not appear at the same time: new_height, new_width, but either will appear

  // console.log([map_id.r_x,map_id.r_y])
  // See which one is missing
  sendViaSocket({
    action: "move",
    u_id: u_id,
    position: [map_id.r_x, map_id.r_y],
    direction:1,
    speed:[0,0],
  });
}

function navigation() {
  // Navigation only do one time, move is down every time
  // 1.first find the nearest navigation point for both , like a light house(when chosen)
  // get the index n_i

  // 2. may be a easy line is enough, but more can be done as perfection
  // maybe we can generate an array and replace n_i1 and n_i2 with new points
  path = [];
  if (n_i1 < n_i2) {
    for (let j = n_i1; j <= n_i2; j++) {
      path.push([m_points[j][0] * n_c_perc, m_points[j][1] * n_c_perc]);
      if (j != n_i1) {
        line(
          m_points[j - 1][0] * n_c_perc,
          m_points[j - 1][1] * n_c_perc,
          m_points[j][0] * n_c_perc,
          m_points[j][1] * n_c_perc
        );
      }
      //strokeWeight(1);
      //textSize(20);
      //text(j, m_points[j][0] * n_c_perc, m_points[j][1] * n_c_perc); // just like a path way
    }
  } else {
    // direction should always be n_i1->n_i2 no matter large or small
    for (let j = n_i1; j >= n_i2; j--) {
      path.push([m_points[j][0] * n_c_perc, m_points[j][1] * n_c_perc]);
      if (j != n_i2) {
        line(
          m_points[j - 1][0] * n_c_perc,
          m_points[j - 1][1] * n_c_perc,
          m_points[j][0] * n_c_perc,
          m_points[j][1] * n_c_perc
        );
      }
      //strokeWeight(1);
      //textSize(20);
      //text(j, m_points[j][0] * n_c_perc, m_points[j][1] * n_c_perc); // just like a path way
    }
  }

  // 2.1 a mathmatic method for starting point and destination

  //console.log(path)
  // there are a few possibilities
  var start = connect_road(n_i1, [character.X, character.Y], 0);
  path.unshift(start);
  var end = connect_road(n_i2, [character.dest_x, character.dest_y], 1);
  path.push(end);
  // noStroke()

  // console.log(path)
  // 3. move towards the destination

  //console.log(path)

  // 4. finish
  //character.dflag = false;
  //character.choosen = false;
}

function connect_road(index, pt, fg) {
  var n_p = [m_points[index][0] * n_c_perc, m_points[index][1] * n_c_perc];

  if (fg == 0) {
    // This matters as you need to decide
    // whether use [character.X, character.Y] or[character.dest_x, character.dest_y]
    if (index == 0) {
      if (m_points[index][0] == m_points[index + 1][0]) {
        // due to our way of painting, either x or y axis is the same

        return [m_points[index][0] * n_c_perc, character.Y];
      } else {
        return [character.X, m_points[index][1] * n_c_perc];
      }
    } else if (index == m_points.length - 1) {
      if (m_points[index][0] == m_points[index - 1][0]) {
        // due to our way of painting, either x or y axis is the same
        return [m_points[index][0] * n_c_perc, character.Y];
      } else {
        return [character.X, m_points[index][1] * n_c_perc];
      }
    } else {
      //// opposite to the direction to make sure that there will be a way
      // This is according to whether you are "between" or "outside" the two points

      if (m_points[index][0] == m_points[index + 1][0]) {
        // due to our way of painting, either x or y axis is the same
        // remember there are a perc there
        if (
          (m_points[index][1] < character.Y / n_c_perc &&
            m_points[index + 1][1] > character.Y / n_c_perc) ||
          (m_points[index][1] > character.Y / n_c_perc &&
            m_points[index + 1][1] < character.Y / n_c_perc)
        ) {
          return [m_points[index][0] * n_c_perc, character.Y];
        } else {
          return [character.X, m_points[index][1] * n_c_perc];
        }
      } else {
        // Here else means m_points[index][0] == m_points[index-1][0])
        if (
          (m_points[index][0] < character.X / n_c_perc &&
            m_points[index + 1][0] > character.X / n_c_perc) ||
          (m_points[index][0] > character.X / n_c_perc &&
            m_points[index + 1][0] < character.X / n_c_perc)
        ) {
          return [character.X, m_points[index][1] * n_c_perc];
        } else {
          return [m_points[index][0] * n_c_perc, character.Y];
        }
      }
    }
  } else if (fg == 1) {
    // Here else means index == n_i2
    // whether use [character.X, character.Y] or[character.dest_x, character.dest_y]

    if (index == 0) {
      if (m_points[index][0] == m_points[index + 1][0]) {
        // due to our way of painting, either x or y axis is the same

        return [m_points[index][0] * n_c_perc, character.dest_y];
      } else {
        return [character.dest_x, m_points[index][1] * n_c_perc];
      }
    } else if (index == m_points.length - 1) {
      if (m_points[index][0] == m_points[index - 1][0]) {
        // due to our way of painting, either x or y axis is the same
        return [m_points[index][0] * n_c_perc, character.dest_y];
      } else {
        return [character.dest_x, m_points[index][1] * n_c_perc];
      }
    } else {
      //// opposite to the direction to make sure that there will be a way
      // This is according to whether you are "between" or "outside" the two points

      if (m_points[index][0] == m_points[index + 1][0]) {
        // due to our way of painting, either x or y axis is the same
        // remember there are a perc there
        if (
          (m_points[index][1] < character.dest_y / n_c_perc &&
            m_points[index + 1][1] > character.dest_y / n_c_perc) ||
          (m_points[index][1] > character.dest_y / n_c_perc &&
            m_points[index + 1][1] < character.dest_y / n_c_perc)
        ) {
          return [m_points[index][0] * n_c_perc, character.dest_y];
        } else {
          return [character.dest_x, m_points[index][1] * n_c_perc];
        }
      } else {
        if (
          (m_points[index][0] < character.dest_x / n_c_perc &&
            m_points[index + 1][0] > character.dest_x / n_c_perc) ||
          (m_points[index][0] > character.dest_x / n_c_perc &&
            m_points[index + 1][0] < character.dest_x / n_c_perc)
        ) {
          return [character.dest_x, m_points[index][1] * n_c_perc];
        } else {
          return [m_points[index][0] * n_c_perc, character.dest_y];
        }
      }
    }
  }
}

function Move4() {
  fill(255);
  stroke(255);
  strokeWeight(1);
  setLineDash([10, 10]);
  if (mouseX > move4.right) {
    // is that possible to mark out the areas?
    character.d1_x = character.dv;
    line(move4.right, 0, move4.right, Canvas_width);
  } else if (mouseX < move4.left) {
    character.d1_x = -character.dv;

    line(move4.left, 0, move4.left, Canvas_width);
  } else if (mouseY > move4.down) {
    character.d1_y = character.dv;

    line(0, move4.down, Canvas_lenth, move4.down);
  } else if (mouseY < move4.up) {
    character.d1_y = -character.dv;
    line(0, move4.up, Canvas_lenth, move4.up);
  } else {
    character.d1_x = 0;
    character.d1_y = 0;
    strokeWeight(0);
    setLineDash([]);
  }
}

function elevator() {
  var new_floor = prompt(
    "What floor do you want to go to? We have " + Object.keys(n_maps)
  );
  //console.log(Object.keys(n_maps))
  //console.log(new_floor)
  if (Object.keys(n_maps).indexOf(new_floor) != -1) {
    // A way to check whether a floor is acceptable
    alert("Transporting you to " + new_floor);
    user_list.floors[u_id] = new_floor;
    map_id.floor = new_floor;
    map_id.r_x = 0;
    map_id.r_y = 0;
    user_list.positions[u_id] = [0, 0];
    elevator_flag = false;
    // n_c_perc have to be renewed
    n_map = n_maps[user_list.floors[u_id]];

    if ((n_map.height * Canvas_lenth) / n_map.width < Canvas_width) {
      n_c_perc = Canvas_lenth / n_map.width;
      // fill the lenth direction
      new_height = n_map.height * n_c_perc;
      // image(n_map, 0, 0, Canvas_lenth, new_height);
    } else {
      // fill the height direction
      n_c_perc = Canvas_width / n_map.height;
      new_width = n_map.width * n_c_perc;
      // image(n_map, 0, 0, new_width, Canvas_width);
    }

    sendViaSocket({
      action: "elevator",
      u_id: u_id,
      floor: new_floor,
    });
  } else {
    alert("Not an available floor!");
  }
}

function mousePressed() {
  let mouse_data = {
    x: mouseX,
    y: mouseY,
    name: name,
    r: 10,
  };

  //DBpointer.push({x:mouseX,y:mouseY});

  // helper for the points
  if (false) {
    points[user_list.floors[u_id]].push([mouseX, mouseY]);
    text(points[user_list.floors[u_id]].length, mouseX, mouseY);
    //console.log(points)
  }

  if (!character.huge_flag) {
    // console.log([mouseX,mouseY])
    // destination

    if (character.choosen) {
      character.dflag = !character.dflag;
      character.dest_x = mouse_data.x;
      character.dest_y = mouse_data.y;

      // calculate a nearest point
      n_i2 = 10000; // which is almost impossible
      var n_d = 10000 ** 5; // as long as it is longer than longest distance on the map
      for (let j = 0; j < m_points.length; j++) {
        var x = m_points[j][0] * n_c_perc;
        var y = m_points[j][1] * n_c_perc;
        var d_2 = (character.dest_x - x) ** 2 + (character.dest_y - y) ** 2;

        if (d_2 < n_d) {
          // the nearest distance it self should be a square
          n_i2 = j; // Is this because j is changeable?
          n_d = d_2;
        }
      }
      navigation();
      navigation_id = 0;
      //console.log(path)
      //console.log(navigation())
    }

    if (
      (mouseX - character.X) ** 2 + (mouseY - character.Y) ** 2 <=
      character.Radium ** 2
    ) {
      character.choosen = !character.choosen;

      // calculate a nearest point to the starting point
      n_i1 = 10000; // which is almost impossible
      var n_d = 10000 ** 5; // as long as it is longer than longest distance on the map
      for (let j = 0; j < m_points.length; j++) {
        var x = m_points[j][0] * n_c_perc;
        var y = m_points[j][1] * n_c_perc;
        var d_2 = (character.X - x) ** 2 + (character.Y - y) ** 2;

        if (d_2 < n_d) {
          // the nearest distance it self should be a square
          n_i1 = j; // Is this because j is changeable?
          n_d = d_2;
        }
      }
    } // check if the character is clicked

    if (keyIsDown(70)) {
      Flashmove(mouseX, mouseY);
    } // Flash move
  } else {
    if (
      mouseX < move4.left ||
      mouseY < move4.up ||
      mouseX > move4.right ||
      mouseY > move4.down
    ) {
      character.d1_f = !character.d1_f;
    }
    // send data
    //sendViaSocket(data)
  }

  if (elevator_flag) {
    elevator();
  }
}

function mouseReleased() {
  //character_i1.play()
}

let key_flag = true;
// disable the keyPressed if needed
function keyPressed() {
  if (key_flag) {
    if (character.df) {
      if (keyCode == RIGHT_ARROW || key == "d") {
        character.d_x = character.dv;
      } else if (keyCode == LEFT_ARROW || key == "a") {
        character.d_x = -character.dv;
      } else if (keyCode == UP_ARROW || key == "w") {
        character.d_y = -character.dv;
      } else if (keyCode == DOWN_ARROW || key == "s") {
        character.d_y = character.dv;
        //character_imgs["front"].play()
      } else if (key == "=") {
        map_id.perc += 0.1;
      } else if (key == "-") {
        map_id.perc -= 0.1;
      }
    } else {
      character.d_x = 0;
      character.d_y = 0;
    }

    if (keyCode == ESCAPE) {
      var nav = document.getElementById("left-bar");
      if (nav.style.display == "none") {
        nav.style.display = "flex";
      } else {
        nav.style.display = "none";
      }
      // navigation bar
    }

    if (key == "p") {
      // Help to see the p_map
      p_flag = !p_flag;

      //points["B2"].push([map_id.r_x, map_id.r_y]);
      //console.log(points["B2"]);
    } // Helping to collect the points

      
    // teleport 
    if (key == "t"){
     
      DBteleport.push({name:name,x:map_id.r_x,y:map_id.r_y})
    }
    
    if (key == "n") {
      nmove_flag = !nmove_flag;
    }
    if (keyCode == CONTROL) {
      // a example of turning on or off the huge_map mode
      character.huge_flag = !character.huge_flag;
    }
    if (keyCode == BACKSPACE) {
      talk_flag = false;
      sendViaSocket({ action: "talk", u_id: u_id, talk: "" });
    }
    if (key == " "){
      clearDBReference("pointing")
    }
  }

  // Chatbox can not be disabled
  // Chatbox
  var bb = document.getElementById("billboard");
  if (bb.style.display != "flex"){
      if (
    keyCode == ENTER) {
    
    var chatdiv = document.getElementById("Chatbox");
    var chatbox = document.getElementById("Talks");
    if (chatdiv.style.display == "none") {
      // In this case when you are typing the character will not move
      character.df = false;

      chatdiv.style.display = "flex";
      key_flag = false;
      chatbox.value = "";
    } else {
      chatdiv.style.display = "none";
      // get the input and reset it to default
      // yu will need to do things to the textaera rather than the div
      character.df = true;
      talk = chatbox.value;
      talk_flag = true;
      // console.log(talk)

      key_flag = true;
      sendViaSocket({ action: "talk", u_id: u_id, talk: talk });
    }
    
    }
  }
  // Billboard
  if (keyCode == SHIFT) {
    // var bb = document.getElementById("billboard");
    if (bb.style.display == "none") {
      // In this case when you are typing the character will not move
      bb.style.display = "flex";
      key_flag = false;
    } else {
      bb.style.display = "none";
      key_flag = true;
    }
  }
}

function keyReleased() {
  if (keyCode == RIGHT_ARROW || key == "d") {
    character.d_x = 0;
  } else if (keyCode == LEFT_ARROW || key == "a") {
    character.d_x = 0;
  } else if (keyCode == UP_ARROW || key == "w") {
    character.d_y = 0;
  } else if (keyCode == DOWN_ARROW || key == "s") {
    character.d_y = 0;
  }
}

function drawText(data) {
  textAlign(CENTER, CENTER);
  //for (i = 0;i < data.length; i++){
  //text(data[i], Canvas_lenth/2, Canvas_width/2+40*i);
  text(data, window.innerWidth / 2, window.innerHeight / 2);
  background(0);
  //}
}

function sendViaSocket(data) {
  // drawText(data);
  socket.emit("connection_name", data);
}
// This may become one of the most important state machine
function receiveViaSocket(data) {
  // drawText(data);
  // console.log(data);
  if (data.action == "login") {
    user_list.names.push(data.name);
    user_list.floors.push(data.floor);
    user_list.positions.push(data.position);
    user_list.talks.push(data.talk);
    user_list.sockets.push(data.socket);
    user_list.directions.push(data.direction)
    user_list.speeds.push(data.speed)
    console.log(
      data.name+
      " logged in "+
      "with u_id "+
      user_list.names.length - 1
    );
    // Not sure whether this gonna work,
    // only for a few people or only for the new guy?

    // socket.to(data.socket).emit("connection_name",{action:"renew",new_list:user_list})
    // There is some trouble with this sentence, otherwise the workload of server would be much smaller
    socket.emit("connection_name", { action: "renew", new_list: user_list });
    // May crush as the user number increase
  } else if (data.action == "renew") {
    // In this way the user itself may not always be the fisrt
    // And can even be the last one if it is the last to come
    // So in this case
    // Every one have the same user_list according to the login sequence
    user_list = data.new_list;
    // clearDBReference("teleport")
    
    //DBteleport.push({name:"None",x:0,y:0})
    
    // console.log(user_list)
    if (user_list.names.slice(-1) == name) {
      u_id = user_list.names.length - 1;
    }
    // console.log(user_list)
    // console.log(u_id)
  } else if (data.action == "move") {
    user_list.positions[data.u_id] = data.position;
    user_list.directions[data.u_id] = data.direction
    user_list.speeds[data.u_id] = data.speed
    // console.log(user_list.positions[data.u_id])
  } else if (data.action == "talk") {
    user_list.talks[data.u_id] = data.talk;
  } else if (data.action == "initialization") {
    user_list = data.user_list;
  } else if (data.action == "elevator") {
    user_list.floors[data.u_id] = data.floor;
    user_list.positions[data.u_id] = [0, 0];
    // console.log(user_list);
  }
}

//helper of drawing dashline
function setLineDash(list) {
  drawingContext.setLineDash(list);
}

function windowResized() {
  if (set) {
    layout1();
    n_map = n_maps[user_list.floors[u_id]];

    if ((n_map.height * Canvas_lenth) / n_map.width < Canvas_width) {
      n_c_perc = Canvas_lenth / n_map.width;
      // fill the lenth direction
      new_height = n_map.height * n_c_perc;
      image(n_map, 0, 0, Canvas_lenth, new_height);
    } else {
      // fill the height direction
      n_c_perc = Canvas_width / n_map.height;
      new_width = n_map.width * n_c_perc;
      image(n_map, 0, 0, new_width, Canvas_width);
    }
    character.X = map_id.r_x * n_c_perc;
    // Here should be some issue as the two pictures are the same size
    // These propotion should be same new_height / c_map.height ==  Canvas_lenth / c_map.width
    character.Y = map_id.r_y * n_c_perc;
  }
}

/* global
io
firebase
p5, ml5, ADD, ALT, ARROW, AUDIO, AUTO, AXES, BACKSPACE, BASELINE, BEVEL, BEZIER, BLEND, BLUR, BOLD, BOLDITALIC, BOTTOM, BURN, CENTER, CHORD, CLAMP, CLOSE, CONTROL, CORNER, CORNERS, CROSS, CURVE, DARKEST, DEGREES, DEG_TO_RAD, DELETE, DIFFERENCE, DILATE, DODGE, DOWN_ARROW, ENTER, ERODE, ESCAPE, EXCLUSION, FALLBACK, FILL, GRAY, GRID, HALF_PI, HAND, HARD_LIGHT, HSB, HSL, IMAGE, IMMEDIATE, INVERT, ITALIC, LABEL, LANDSCAPE, LEFT, LEFT_ARROW, LIGHTEST, LINEAR, LINES, LINE_LOOP, LINE_STRIP, MIRROR, MITER, MOVE, MULTIPLY, NEAREST, NORMAL, OPAQUE, OPEN, OPTION, OVERLAY, P2D, PI, PIE, POINTS, PORTRAIT, POSTERIZE, PROJECT, QUADRATIC, QUADS, QUAD_STRIP, QUARTER_PI, RADIANS, RADIUS, RAD_TO_DEG, REMOVE, REPEAT, REPLACE, RETURN, RGB, RIGHT, RIGHT_ARROW, ROUND, SCREEN, SHIFT, SOFT_LIGHT, SQUARE, STROKE, SUBTRACT, TAB, TAU, TESS, TEXT, TEXTURE, THRESHOLD, TOP, TRIANGLES, TRIANGLE_FAN, TRIANGLE_STRIP, TWO_PI, UP_ARROW, VIDEO, WAIT, WEBGL, accelerationX, accelerationY, accelerationZ, deltaTime, deviceOrientation, displayHeight, displayWidth, focused, frameCount, height, isKeyPressed, key, keyCode, keyIsPressed, mouseButton, mouseIsPressed, mouseX, mouseY, movedX, movedY, pAccelerationX, pAccelerationY, pAccelerationZ, pRotateDirectionX, pRotateDirectionY, pRotateDirectionZ, pRotationX, pRotationY, pRotationZ, pixels, pmouseX, pmouseY, pwinMouseX, pwinMouseY, rotationX, rotationY, rotationZ, touches, turnAxis, width, winMouseX, winMouseY, windowHeight, windowWidth, abs, acos, alpha, ambientLight, ambientMaterial, angleMode, append, applyMatrix, arc, arrayCopy, asin, atan, atan2, background, beginContour, beginShape, bezier, bezierDetail, bezierPoint, bezierTangent, bezierVertex, blend, blendMode, blue, boolean, box, brightness, byte, camera, ceil, char, circle, clear, clearStorage, color, colorMode, concat, cone, constrain, copy, cos, createA, createAudio, createButton, createCamera, createCanvas, createCapture, createCheckbox, createColorPicker, createDiv, createElement, createFileInput, createGraphics, createImage, createImg, createInput, createNumberDict, createP, createRadio, createSelect, createShader, createSlider, createSpan, createStringDict, createVector, createVideo, createWriter, cursor, curve, curveDetail, curvePoint, curveTangent, curveTightness, curveVertex, cylinder, day, debugMode, degrees, describe, describeElement, directionalLight, displayDensity, dist, downloadFile, ellipse, ellipseMode, ellipsoid, emissiveMaterial, endContour, endShape, erase, exitPointerLock, exp, fill, filter, float, floor, fract, frameRate, frustum, fullscreen, get, getFrameRate, getItem, getURL, getURLParams, getURLPath, green, gridOutput, hex, hour, httpDo, httpGet, httpPost, hue, image, imageMode, int, isLooping, join, keyIsDown, lerp, lerpColor, lightFalloff, lightness, lights, line, loadBytes, loadFont, loadImage, loadJSON, loadModel, loadPixels, loadShader, loadStrings, loadTable, loadXML, log, loop, mag, map, match, matchAll, max, millis, min, minute, model, month, nf, nfc, nfp, nfs, noCanvas, noCursor, noDebugMode, noErase, noFill, noLights, noLoop, noSmooth, noStroke, noTint, noise, noiseDetail, noiseSeed, norm, normal, normalMaterial, orbitControl, ortho, perspective, pixelDensity, plane, point, pointLight, pop, popMatrix, popStyle, pow, print, push, pushMatrix, pushStyle, quad, quadraticVertex, radians, random, randomGaussian, randomSeed, rect, rectMode, red, redraw, registerPromisePreload, removeElements, removeItem, requestPointerLock, resetMatrix, resetShader, resizeCanvas, reverse, rotate, rotateX, rotateY, rotateZ, round, saturation, save, saveCanvas, saveFrames, saveGif, saveJSON, saveJSONArray, saveJSONObject, saveStrings, saveTable, scale, second, select, selectAll, set, setAttributes, setCamera, setFrameRate, setMoveThreshold, setShakeThreshold, shader, shearX, shearY, shininess, shorten, shuffle, sin, smooth, sort, specularColor, specularMaterial, sphere, splice, split, splitTokens, spotLight, sq, sqrt, square, storeItem, str, stroke, strokeCap, strokeJoin, strokeWeight, subset, tan, text, textAlign, textAscent, textDescent, textFont, textLeading, textOutput, textSize, textStyle, textWidth, texture, textureMode, textureWrap, tint, torus, translate, triangle, trim, unchar, unhex, updatePixels, vertex, writeFile, year
drawingContext,loadGif
*/

function layout1() {
  Canvas_lenth = window.innerWidth;
  Canvas_width = window.innerHeight * 0.9;
  resizeCanvas(Canvas_lenth, Canvas_width);
  canvas.position((window.innerWidth - Canvas_lenth) / 2, 0);
  move4 = {
    left: Canvas_lenth * 0.1,
    right: Canvas_lenth * 0.9,
    up: Canvas_width * 0.1,
    down: Canvas_width * 0.9,
  };
}

function layout_change() {
  if (Canvas_lenth == 0.8 * window.innerWidth) {
    layout1();
  } else {
    //Canvas_lenth = window.innerWidth * 0.8;
    resizeCanvas(Canvas_lenth, Canvas_width);
    //canvas.position(window.innerWidth - Canvas_lenth, 0);
  }
  move4 = {
    left: Canvas_lenth * 0.1,
    right: Canvas_lenth * 0.9,
    up: Canvas_width * 0.1,
    down: Canvas_width * 0.9,
  };
}

function objects() {
  for (let j = 0; j < objects_detail.length; j++) {
    // This should be a list sorted according to the y axis of the image
    var r_x = objects_detail[j][0];
    var r_y = objects_detail[j][1];
    var perc = objects_detail[j][2];

    // drawText(r_y)

    //  No need of draw it again

    var right_bottom_x = map_X + r_x * map_id.perc;
    var right_bottom_y = map_Y + r_y * map_id.perc;
    if (right_bottom_y > 0 && right_bottom_x > 0) {
      imageMode(CORNERS);
      image(
        object1,
        right_bottom_x - object1.width * perc * map_id.perc,
        right_bottom_y - object1.height * perc * map_id.perc,
        right_bottom_x,
        right_bottom_y
      ); // built-in attribute width and height
    }

    if (foot_y > r_y) {
      imageMode(CENTER);
      image(
        character_img,
        character.X,
        character.Y,
        character.c_w * character.c_perc * map_id.perc,
        character.c_h * character.c_perc * map_id.perc
      );
    }
  }
}

function walls() {
  if (
    character.d_x + character.d1_x != 0 ||
    character.d_y + character.d1_y != 0
  ) {
    // moved
    var color = p_maps[user_list.floors[u_id]].get(
      map_id.r_x,
      foot_y
    );
    // console.log(map1_px.get(map_id.r_x*map_id.px_perc, map_id.r_y*map_id.px_perc))
    //console.log([map_id.r_x, map_id.r_y])
    // console.log(color);
    var walls = red(color) != 0 && green(color) != 0 && blue(color) != 0;
    var elevator = red(color) == 255 && green(color) == 38 && blue(color) == 0;
    if (walls) {
      map_id.r_x -= (character.d_x + character.d1_x)*1.01; // -0 if minused
      map_id.r_y -= (character.d_y + character.d1_y)*1.01; // *2 if you want a bounce effect
    }
    if (elevator) {
      elevator_flag = true;
    } else {
      elevator_flag = false;
    }

    // Here we consider it as a signal of movement

    // Haven't consider going to other floors yet
  }
}

function whole_path(m_points) {
  for (let j = 0; j < m_points.length; j++) {
    if (j != 0) {
      //stroke("red")
      // strokeWeight(1)
      line(
        m_points[j - 1][0] * n_c_perc,
        m_points[j - 1][1] * n_c_perc,
        m_points[j][0] * n_c_perc,
        m_points[j][1] * n_c_perc
      );
    }

    stroke("white");
    strokeWeight(1);
    textSize(20);
    text(j, m_points[j][0] * n_c_perc, m_points[j][1] * n_c_perc);
  }
}

function setupDB() {
  const firebaseConfig = {
    apiKey: "AIzaSyD5H--m7QCUBi5N5loYt6Z57SRE6KQVxsI",
    authDomain: "jyc-0806.firebaseapp.com",
    projectId: "jyc-0806",
    storageBucket: "jyc-0806.appspot.com",
    messagingSenderId: "576126058520",
    appId: "1:576126058520:web:f00006c79dee18fe21036d",
    databaseURL:
      " https://jyc-0806-default-rtdb.asia-southeast1.firebasedatabase.app",
  };

  firebase = firebase.initializeApp(firebaseConfig);
  database = firebase.database();
}

function getDBReference(refName) {
  let ref = database.ref(refName);
  
  
  ref.on("child_added", function(data,childKey){
    // console.log("DB !Added at "+ childKey)
        
        // you yourself should not recieve the invitation
        if (refName == "teleport" && data.val().name != name ){
            // Can use it as a way of inviting others to transporting to his position
            // Flashmove(data.val().x,data.val().y)
          //vconsole.log(data.key)
          var accept = confirm(data.val().name + " invite you to teleport to ("+data.val().x+","+data.val().y+")") 
          // console.log(accept,data.val().name)
          if (accept == true ){
                map_id.r_x = data.val().x
                map_id.r_y = data.val().y
                
                user_list.positions[u_id] = [map_id.r_x, map_id.r_y];

                character.X = map_id.r_x * n_c_perc;

                character.Y = map_id.r_y * n_c_perc;


                map_X = Canvas_lenth / 2 - map_id.r_x * map_id.perc;
                map_Y = Canvas_width / 2 - map_id.r_y * map_id.perc;
            
        sendViaSocket({
        action: "move",
        u_id: u_id,
        position:[map_id.r_x, map_id.r_y],
        direction: character_direction_code,
        speed:[0,0]
        });
          
        }
      }
    
  });
    ref.on("child_removed", function(data){
      //console.log("DB !Removed")
    
  });
    ref.on("child_changed", function(data,childKey){
    // console.log("DB !Changed at "+childKey)
      
      if (refName == "teleport" ){

            
      }
  });
  
  
  return ref;
}

function clearDBReference(refName) {
  let ref = database.ref(refName);
  ref
    .remove()
    .then(function () {
      console.log("DB !Successfully cleared reference(" + refName + ") in realtime database.");
    })
    .catch(function (error) {
      console.log("DB !Failed to clear reference(" + refName + ") for: " + error.message);
    });
}


function changeDBreference(refName){
  let ref = database.ref(refName);
  
}
