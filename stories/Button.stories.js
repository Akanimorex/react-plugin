import { ButtonNew } from '../components/ButtonNew';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: 'Example/Button',
  component: ButtonNew,
  args: {
    isLoading: false,
    fullWidth:false,
    small:false,
    disabled:false
  }
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary = {
  args: {
    label: 'Building with Salil',
    variant:'primary'
  }
};

export const Secondary = {
  args: {
    label:'Secondary Button',
    variant:'secondary'
  }
}

export const Loading = {
  args: {
    label:"Loading...",
    isLoading:true
  }
}

export const fullWidth = {
  args:{
    label:"Full Width Button",
    fullWidth:true
  }
}

export const  Small = {
    args:{
      label:'small button',
      small:true
    }
}

export const Disabled ={
  args:{
    label:'Disabled',
    disabled:true
  }
}