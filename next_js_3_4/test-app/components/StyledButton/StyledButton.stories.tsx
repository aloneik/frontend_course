import { StyledButton } from "./StyledButton";

export default {
    title: "StyledButton",
    component: StyledButton
}

const Template = (arg: any) => <StyledButton {...arg} />

export const Default = Template.bind({});
Default.args = {
    children: "Text",
    $variant: "text",
    $color: "success"
};
