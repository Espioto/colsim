export const formatChoice = (choice) => {
  return choice.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){
    return str.toUpperCase();
  });
};