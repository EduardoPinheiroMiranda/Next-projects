import styled, {keyframes, css} from "styled-components";


export const Container = styled.div`
    max-width: 700px;
    background: #FFFFFF;
    border-radius: 4px;
    box-shadow: 0 0 20px rgba(0,0,0,0.2);
    padding: 30px;
    margin: 80px auto;

    h1{
        font-size: 20px;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px
    }
`;

export const Form = styled.form`
    margin-top: 30px;
    display: flex;
    flex-direction: row;

    input{
        flex: 1;
        border: 1px solid ${props => (props.alert ? "#f00" : "#ddd")};
        padding: 10px 15px;
        border-radius: 4px;
        font-size: 17px;
    }
`

// create animation
const animated = keyframes`
    from{
        transform: rotate(0deg);
    }

    to{
        transform: rotate(360deg);
    }
`

export const SubmitButton = styled.button.attrs(
    props => ({
        type: "submit",
        disabled: props.loading
    }) 
)`
    background: #0D2636;
    border: 0;
    border-radius: 4px;
    margin-left: 10px;
    padding: 0 15px;
    display: flex;
    justify-content: center;
    align-items: center;


    &[disabled]{
        cursor: not-allowed;
        opacity: 0.5;
    }

    ${props => 
        props.loading &&
        css`
            svg{
                animation: ${animated} 2s linear infinite;
            }
        `
    }

`
export const List = styled.ul`

    list-style: none;
    margin-top: 20px;

    li{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 15px 0;
    }

    li + li{
        border-top: 1px solid #EEE;
    }

    a{
        color: #0D2636;
        text-decoration: none
    }

    div{
        display: flex;
        gap: 15px;
    }
`

export const ButtonTrash = styled.button.attrs({
    type: "button"
})`
    background: transparent;
    border: none;

    svg{
        color: #0D2636;
    }
`