import styled from "styled-components";

export const container = styled.div`
    width: 960px;
    margin: 80px auto;
`;

export const header = styled.div`
  font-size: 40px;
  font-weight: 700;
  line-height: 52px;
  margin-bottom: 22px;
  color: #0A235C;
`;

export const form = styled.form`
    display: block;
    width: 100%;
    margin-bottom: 60px;
`

export const input = styled.input`
    display: inline-block;
    height: 32px;
    width: 370px;
    padding-left: 10px;
    color: #0A235C;   
    font-size: 16px;
    border:1px solid #A1A1A1;
    box-shadow: 0 0 16px -8px rgb(161, 161, 161, 0.35);
    border-radius: 8px;
    &:focus {
        outline: none !important;
        border:1px solid #23B5B5 !important;
        box-shadow: 0 0 16px -8px rgb(35, 181, 181, 0.35);
    }
`

export const separator = styled.span`
    display: inline-block;
    font-size: 24px;
    padding: 20px 12px;
    
`

export const button = styled.button`
    background-color: #23B5B5;
    height: 38px;
    width: 120px;
    font-size: 16px;
    color: #FFFFFF;
    font-weight: 500;
    cursor: pointer;
    border-radius: 8px;
    outline: none !important;
    border:none !important;
    box-shadow: 0 0 16px -8px rgb(35, 181, 181, 0.35);
`

export const issuer_title = styled.div`
  font-size: 24px;
  line-height: 32px;
  font-weight: 700;
  color: #008080;
`;

export const issuer_sub_title = styled.div`
  font-size: 16px;
  line-height: 32px;
  font-weight: 400;
  color: #60739F;
  margin-bottom: 22px;
`;

export const pre = styled.pre`
    width: 960px;
    overflow:auto;
`

export const issuer_body = styled.div`
    font-size: 20px;
    line-height: 24px;
    color: #0A235C;
    margin-bottom: 32px;
    word-wrap: break-word;
`;

export const comment_count = styled.span`
    margin-left: 20px;
    color: #008080;
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 20px;
`



export const comment_body = styled.div`   
    display: block;
    width: 100%;
    margin-bottom: 32px;
    padding-left: 20px;
    background-color: rgb(10, 35, 92, 0.05);
    border-radius: 8px;
    margin: 20px 0;
    padding: 24px; 
`;

export const comment_author = styled.div`
    color: #0A235C;
    font-size: 16px;
    line-height: 24px;
    font-weight: 700;
`;

export const comment_body_item = styled.div`
    color: #0A235C;
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;
    word-wrap: break-word;
`;


