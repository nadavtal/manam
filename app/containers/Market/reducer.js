
import produce from 'immer';
import * as actionTypes from './constants';


export const initialState = {
  categories: [
    {id: 1, icon: 'car', name: 'Vehicles', parentCategories: []},
    {id: 2, icon: 'city', name: 'Arcitecture', parentCategories: []},
    {id: 3, icon: 'utensils', name: 'Food', parentCategories: []},
    // {id: 4, icon: 'palette', name: 'Animated', parentCategories: []},
    // {id: 5, icon: 'user-astronaut', name: 'Space', parentCategories: []},
    {id: 6, icon: 'running', name: 'Sports', parentCategories: []},
    {id: 7, icon: 'horse', name: 'Animals', parentCategories: []},
    {id: 8, icon: 'leaf', name: 'Nature', parentCategories: []},
    {id: 9, icon: 'car', name: 'Cars', parentCategories: [1]},
    {id: 10, icon: 'fighter-jet', name: 'Air planes', parentCategories: [1]},
    {id: 11, icon: 'motorcycle', name: 'Motor cycles', parentCategories: [1]},
    {id: 12, icon: 'truck', name: 'Trucks', parentCategories: [1]},
    {id: 13, icon: 'flag-checkered', name: 'Race cars', parentCategories: [1]},
    {id: 14, icon: 'car', name: 'Old cars', parentCategories: [1]},
    {id: 15, icon: 'car', name: 'Buildings', parentCategories: [2]},
    {id: 16, icon: 'fighter-jet', name: 'Houses', parentCategories: [2]},
    {id: 17, icon: 'motorcycle', name: 'Street', parentCategories: [2]},
    {id: 18, icon: 'truck', name: 'Lighing', parentCategories: [2]},
    {id: 19, icon: 'flag-checkered', name: 'Doors', parentCategories: [2]},
    {id: 20, icon: 'car', name: 'Meals', parentCategories: [3]},
    {id: 21, icon: 'car', name: 'Meat', parentCategories: [3]},
    {id: 22, icon: 'fighter-jet', name: 'Vegetables', parentCategories: [3]},
    {id: 23, icon: 'motorcycle', name: 'Drinks', parentCategories: [3]},
    {id: 24, icon: 'truck', name: 'Snacks', parentCategories: [3]},
    {id: 25, icon: 'car', name: 'Forest', parentCategories: [8]},
    {id: 26, icon: 'car', name: 'Trees', parentCategories: [8]},
    {id: 27, icon: 'fighter-jet', name: 'Flowers', parentCategories: [8]},
    {id: 28, icon: 'motorcycle', name: 'Leafs', parentCategories: [8]},
    {id: 29, icon: 'truck', name: 'Grass', parentCategories: [8]},
    {id: 30, icon: 'car', name: 'Dogs', parentCategories: [7]},
    {id: 31, icon: 'car', name: 'Cats', parentCategories: [7]},
    {id: 32, icon: 'fighter-jet', name: 'Wild', parentCategories: [7]},
    {id: 33, icon: 'motorcycle', name: 'Birds', parentCategories: [7]},
    {id: 34, icon: 'truck', name: 'Insects', parentCategories: [7]},
    {id: 35, icon: 'car', name: 'Ball', parentCategories: [6]},
    {id: 36, icon: 'car', name: 'Court', parentCategories: [6]},
    {id: 37, icon: 'fighter-jet', name: 'Player', parentCategories: [6]},
    {id: 38, icon: 'motorcycle', name: 'Score board', parentCategories: [6]},
    
    
  ],
  projects: [
    {id: 1, name: 'Vehicles', image_url: 'Arroyo_walking_bridge-DJI_0240.jpg', parentCategories: []},
    {id: 2, name: 'Arcitecture', image_url: 'Bridge 9- digital twin.jpg', parentCategories: []},
    {id: 3, name: 'Food', image_url: '', parentCategories: []},
    {id: 4, name: 'Animated', image_url: '', parentCategories: []},
    {id: 5, name: 'Space', image_url: '', parentCategories: []},
    {id: 6, name: 'Sports', image_url: '', parentCategories: []},
    {id: 7, name: 'Animals', image_url: '', parentCategories: []},
    {id: 8, name: 'Nature', image_url: '', parentCategories: []},
    {id: 9, name: 'Cars', image_url: '', parentCategories: [1]},
  ],
  models: [
    {id: 1, name: 'model 1', type: 'cad', ion_id: 71884, url: 'http://vm1.manam.co.il/manam/3D/GLB/Road_9_Bridge_28_colors33.glb', description: 'aksjdhkajsdhkjakjdshasskdaldkalksdjlaksdajsdadksdjkajlkalskd', price: 50, image_url: 'Arroyo_walking_bridge-DJI_0240.jpg', parentCategories: []},
    // {id: 2, name: 'model 2', type: 'model', ion_id: null, url: 'http://vm1.manam.co.il/manam/3d/arroyowb/scene/Production_2_Cesium.json', description: '', price: 50, image_url: 'Bridge 9- digital twin.jpg', parentCategories: []},
    {id: 3, name: 'model 3', type: 'cad', ion_id: 72161, url: 'scene.gltf', description: 'aksjdhkajsdhkjakjdshasskdaldkalksdjlaksdajsdadksdjkajlkalskd', price: 50, image_url: '', parentCategories: []},
    {id: 4, name: 'model 4', type: 'cad', ion_id: 71967, url: 'scene.gltf', description: 'aksjdhkajsdhkjakjdshasskdaldkalksdjlaksdajsdadksdjkajlkalskd', price: 50, image_url: '', parentCategories: []},
    {id: 5, name: 'model 5', type: 'cad', ion_id: 72159, url: 'scene.gltf', description: 'aksjdhkajsdhkjakjdshasskdaldkalksdjlaksdajsdadksdjkajlkalskd', price: 50, image_url: '', parentCategories: []},
    {id: 6, name: 'model 6', type: 'cad', ion_id: 71917, url: 'scene.gltf', description: 'aksjdhkajsdhkjakjdshasskdaldkalksdjlaksdajsdadksdjkajlkalskd', price: 50, image_url: '', parentCategories: []},
    {id: 7, name: 'sport car', type: 'cad', ion_id: 84835, url: 'scene.gltf', description: 'aksjdhkajsdhkjakjdshasskdaldkalksdjlaksdajsdadksdjkajlkalskd', price: 50, image_url: '', parentCategories: []},
    // {id: 7, name: 'plane', type: 'cad', ion_id: 85045, url: 'scene.gltf', description: 'aksjdhkajsdhkjakjdshasskdaldkalksdjlaksdajsdadksdjkajlkalskd', price: 50, image_url: '', parentCategories: []},
    
  ],

};

/* eslint-disable default-case, no-param-reassign */
const organizationReducer = (state = initialState, action) =>


  produce(state, draft => {

    switch (action.type) {

      // case actionTypes.ORGANIZATION_LOADED:
      //   console.log('ORGANIZATION_LOADED', action.data)
      //   draft.organization = action.data.organization[0];
      //   draft.bridges = action.data.bridges;
      //   draft.projects = action.data.projects;
      //   draft.processesTemplates = action.data.processes;
      //   draft.providers = action.data.providers;
      //   draft.processesTasks = action.data.processesTasks;
      //   draft.projectsProcesses = action.data.projectsProcesses;
      //   draft.tasks = action.data.tasks;
      //   break;
      

      default:
        return state
    }
  // }
  });

export default organizationReducer;
