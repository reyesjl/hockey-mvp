// Function to get Font Awesome icon for gender
const getGenderIcon = (gender: 'boys' | 'girls' | 'both'): string => {
  switch (gender) {
    case 'boys':
      return '<i class="fa-solid fa-mars"></i>';
    case 'girls':
      return '<i class="fa-solid fa-venus"></i>';
    case 'both':
      return '<i class="fa-solid fa-venus-mars"></i>';
    default:
      return '';
  }
};

export { getGenderIcon };