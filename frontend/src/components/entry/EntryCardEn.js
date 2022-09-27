import React, { useState } from 'react';
// import axios from 'axios';

import {
  Container,
  TextField,
  // Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ReadOnlyInput from './EntryCardReadOnlyInput';

// import postAxios from '../../lib/postAxios';
// import API from '../../config';

const ValidationTextField = styled(TextField)({
  '& input:invalid + fieldset': {
    borderColor: 'gray',
    borderWidth: 1
  },
  '& input:valid + fieldset': {
    borderColor: 'green',
    borderWidth: 2
  }
});

function EntryCardEn() {
  const [nameKo, setNameKo] = useState('');
  const nameKoCheck = /[^가-힣]/;
  const [nameKoError, setNameKoError] = useState(false);
  const [gender, setGender] = useState('');
  const [birth, setBirth] = useState('');
  const birthCheck = /^(19|20)\d{2}/;
  const [birthError, setBirthError] = useState(false);
  const [nameEn, setNameEn] = useState('');
  const nameEnCheck = /[^a-zA-Z]/;
  const [nameEnError, setNameEnError] = useState(false);
  const navigate = useNavigate();

  const linkToLoading = () => {
    navigate('/loading');
  };

  const saveToStorage = (localdata) => {
    localStorage.setItem('username', nameEn);
    localStorage.setItem('birth', birth);
    localStorage.setItem('gender', gender);
  };

  const sendData = async () => {
    const data = { name: nameKo, birth: birth, gender: gender };
    console.log(data);
    // axios.post(`${API.ENTRY}`, data).then((res) => {
    //   saveToStorage(JSON.stringify(res.data));
    // });
    saveToStorage(data);
    linkToLoading();
  };

  return (
    <StyledWrapper>
      <div id="card">
        <Container sx={{ bgcolor: 'var(--secondaryMain)', height: '100px' }}>
          <div id="title">
            <div>THE UNITED STATES OF AMERICA</div>
            <div id="title_b">ARRIVAL CARD</div>
          </div>
        </Container>
        <Container id="content" sx={{ bgcolor: '#F9F7F4', height: '60vh' }}>
          <div className="qAndA custom-input">
            <div className="question to-move">Name</div>
            <ValidationTextField
              variant="outlined"
              className="answer"
              inputProps={{
                maxLength: 7,
                style: { fontSize: 'clamp(12px,1.3vw,16px)' }
              }}
              error={nameKoError}
              helperText={nameKoError ? '다시 입력해주세요' : null}
              required
              onChange={(e) => {
                const nameKoTmp = e.target.value;
                if (nameKoCheck.test(nameKoTmp) || nameKoTmp.length === 1) {
                  setNameKoError(true);
                } else {
                  setNameKo(nameKoTmp);
                  setNameKoError(false);
                }
              }}
            />
          </div>
          <div className="qAndA">
            <div className="question">Gender</div>
            <FormControl className="answer">
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={gender}
                onChange={(event) => {
                  setGender(event.target.value);
                }}
              >
                <FormControlLabel
                  value="M"
                  control={
                    <Radio
                      sx={{ '&.Mui-checked': { '&': { color: 'green' } } }}
                    />
                  }
                  label={
                    <span style={{ fontSize: 'clamp(12px,1.5vw,16px)' }}>
                      Male
                    </span>
                  }
                />
                <FormControlLabel
                  value="F"
                  control={
                    <Radio
                      sx={{ '&.Mui-checked': { '&': { color: 'green' } } }}
                    />
                  }
                  label={
                    <span style={{ fontSize: 'clamp(12px,1.5vw,16px)' }}>
                      Female
                    </span>
                  }
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div className="qAndA custom-input">
            <div className="question to-move">Birth Year</div>
            <ValidationTextField
              variant="outlined"
              inputProps={{
                maxLength: 4,
                style: { fontSize: 'clamp(12px,1.5vw,16px)' }
              }}
              className="answer"
              placeholder="태어난 해 ex)1995"
              error={birthError}
              helperText={birthError ? '다시 입력해주세요' : null}
              required
              onChange={(e) => {
                const birthTmp = e.target.value;
                if (
                  !birthCheck.test(birthTmp) ||
                  birthTmp.length < 4 ||
                  Number(birthTmp) < 1940 ||
                  Number(birthTmp) > 2021
                ) {
                  setBirthError(true);
                } else {
                  setBirth(birthTmp);
                  setBirthError(false);
                }
              }}
            />
          </div>
          <div className="qAndA custom-input">
            <div className="question to-move">English Name</div>
            <ValidationTextField
              variant="outlined"
              className="answer"
              placeholder="영어 이름 입력"
              inputProps={{
                style: { fontSize: 'clamp(12px,1.3vw,16px)' }
              }}
              error={nameEnError}
              helperText={nameEnError ? '다시 입력해주세요' : null}
              required
              onChange={(e) => {
                const nameEnTmp = e.target.value;
                if (nameEnCheck.test(nameEnTmp)) {
                  setNameEnError(true);
                } else {
                  setNameEn(
                    nameEnTmp.charAt(0).toUpperCase() + nameEnTmp.slice(1)
                  );
                  setNameEnError(false);
                }
              }}
            />
          </div>
          <ReadOnlyInput q="Airline No." a="AIR NAME A108" />
          <ReadOnlyInput q="Nationality" a="Korea" />
        </Container>
      </div>

      <div id="btn">
        {nameKo &&
        !nameKoError &&
        gender &&
        birth &&
        !birthError &&
        nameEn &&
        !nameEnError ? (
          <button id="send-btn" onClick={sendData}>
            내 영어 이름 리포트 보러가기
          </button>
        ) : (
          <button
            id="send-btn"
            onClick={sendData}
            style={{ visibility: 'hidden' }}
          >
            내 영어 이름 리포트 보러가기
          </button>
        )}
      </div>
    </StyledWrapper>
  );
}

export default EntryCardEn;

// function SubmitBtn() {
//   return (
//     <button
//       variant="contained"
//       color="warning"
//       size="large"
//       component={Link}
//       to="/finreport/:selectedName"
//       sx={{ margin: '10px' }}
//     >
//       <span style={{ fontSize: '20px' }}>내 영어 이름 리포트 보러가기</span>
//     </button>
//   );
// }

const StyledWrapper = styled.div`
  @media (max-width: 450px) {
    font-size: 15px;
    #title_b {
      font-size: 17px;
    }
    .answer {
      font-size: 17px;
    }
    #send-btn {
      font-size: 12px;
    }
  }
  @media (min-width: 450px) {
    #title_b {
      font-size: 25px;
    }
    .answer {
      font-size: 20px;
    }
    #send-btn {
      font-size: 20px;
    }
  }
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  #card {
    width: 100%;
  }
  #title {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
  }
  #title_b {
    font-family: 'SCDream7';
  }
  #content {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 450px;
  }
  .qAndA {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  .qAndA.custom-input {
    height: 79px !important;
  }
  .qAndA .to-move {
    top: -12px;
    position: relative;
  }
  .question {
    width: 150px;
    margin: auto 0;
  }
  .answer {
    font-family: 'Daheng';
    width: 200px;
  }
  #btn {
    display: flex;
    justify-content: center;
  }
  #send-btn {
    background-color: var(--secondaryMain);
    margin: 20px;
    padding: 15px;
    border: 0;
  }
`;
