interface InputConfig {
  label: string;
  placeholder: string;
}


export const inputConfigs: Record<string, InputConfig> = {
  style: {
    label: 'Style',
    placeholder: 'e.g. modern, minimal, cute (optional, overrides color/size)'
  },
  color: {
    label: 'Color',
    placeholder: 'e.g. #E51BFC or very dark'
  },
  size: {
    label: 'Size',
    placeholder: 'e.g. medium, large, super huge'
  },
  text: {
    label: 'Text',
    placeholder: 'Button text'
  }
};

export type FormFields = {
  style: string;
  color?: string;
  size?: string;
  text: string;
};

export interface GenerateComponentRequest {
  type: string;
  props: Record<string, string>;
}