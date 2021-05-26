import React, {useState, useEffect, useRef} from 'react';
import './App.css';
import ImageUploading from 'react-images-uploading';
import base from './base.png';
import disclaimer from './disclaimer.svg';

const App = () => {
  const [images, setImages] = useState([]);
  const [imgW, setImgW] = useState(0);
  const [step, setStep] = useState(0);
  const setNextStep = () => setStep((prevState) => prevState + 1);
  const setRestart = () => setStep(0);

    const onChange = (imageList, addUpdateIndex) => {
        setImages(imageList);

        const image = new Image();

        image.onload = function() {
            setImgW(this.width);
            setNextStep();
        };

        image.src = imageList[0].data_img;
    };

    useEffect(() => console.log(images), [images]);

  return (
      <div className="app">
        <header className="app-header">

          {process.env.REACT_APP_TITLE}
        </header>
        <main className={"app-content"}>
          { step === 0 ? (
              <WellcomeScreen onBtnClick={setNextStep}/>
          ) : null}

          { step === 1 ? (
              <Disclaimer
                  onBtnClick={setNextStep}
              />
          ) : null }

          { step === 2 ? (
              <InstructionsScreen setImages={onChange} images={images}/>
          ) : null}

          {step === 3 ? (
              <Result
                onRestartClick={setRestart}
                images={images}
                imgWidth={imgW}
              />
          ) : null}
        </main>
      </div>
  );
}

export default App;


const WellcomeScreen = ({
  onBtnClick,
}) => {
  return (
      <div className={"wellcome"}>
        <p className={"wellcome__title"}>{'В этом году мы стали свидетелями по-настоящему уникальной даты – 100-летия аромата №5'}</p>
        <p className={"wellcome__text"}>{'Предлагаем вам сделать фото на память, чтобы навсегда запомнить это знаковое событие'}</p>
        <div className={"wellcome__btn-holder"}>
          <button className={"wellcome__btn"} onClick={onBtnClick}>{'Дальше'}</button>
        </div>

      </div>
  )
};

const InstructionsScreen = ({
  setImages,
    images,
}) => {
  return (
      <div className={"instructions"}>
        <div className={"instructions__item"}>
          <div className={"instructions__number"}>{"1"}</div>
          <div className={"instructions__title"}>{"Откройте камеру"}</div>
          <div className={"instructions__subtitle"}>{"на своем телефоне"}</div>
        </div>

        <div className={"instructions__item"}>
          <div className={"instructions__number"}>{"2"}</div>
          <div className={"instructions__title"}>{"Улыбнитесь своему отражению"}</div>
          <div className={"instructions__subtitle"}>{"и сделайте красивое селфи"}</div>
        </div>

        <div className={"instructions__item"}>
          <div className={"instructions__number"}>{"3"}</div>
          <div className={"instructions__title"}>{"Загрузите фото"}</div>
          <div className={"instructions__subtitle"}>{"по кнопке ниже"}</div>
        </div>
        <div className={"instructions__btn-holder"}>
            <ImageUploading
                onChange={setImages}
                value={images}
                dataURLKey='data_img'
            >
                {({
                      imageList,
                      onImageUpload,
                  }) => (
                    <>
                        <button className={"instructions__btn"} onClick={onImageUpload}>{'Загрузить фотографию'}</button>
                    </>
                )}
            </ImageUploading>
        </div>
      </div>
  )
};

const Disclaimer = ({
    onBtnClick,
}) => {
    return (
        <div className={"disclaimer"}>
            <div className="disclaimer__icon">
                <img src={disclaimer} alt=""/>
            </div>
            <div className={"disclaimer__content"}>
                <p className={"disclaimer__text"}>{"Юридическая информация:\n" +
                "Данный сервис предоставлен CHANEL - Обществом с ограниченной ответственностью «ШАНЕЛЬ»,\n" +
                "ИНН 7702331790"}</p>
                <p className={"disclaimer__text"}>{"Сайт в целом, а также каждый из составляющих его элементов интеллектуальной собственности\n" +
                "(таких как тексты, иллюстрации, логотипы, товарные знаки, дизайн и прочее), являются\n" +
                "исключительной собственностью CHANEL и /или аффилированных компаний. Использование всего\n" +
                "Сайта или его части, включая загрузку, воспроизведение, передачу, представление или\n" +
                "распространение в коммерческих или иных целях, отличных от вашего личного использования,\n" +
                "строго запрещено. Когда вы используете функцию «Скачать на устройство», предлагаемую на\n" +
                "Сайте, или копируете изображение, включающее элементы Сайта, иным способом, Вы признаете\n" +
                "и соглашаетесь, что такой контент будет использован исключительно в личных целях."}</p>
                <p className={"disclaimer__text"}>{"Персональные данные:\n" +
                "Предоставление данного Сервиса не предусматривает обработку персональных данных\n" +
                "пользователей. Загружаемые Вами изображения и фотографии не используются для установления\n" +
                "личности пользователя и удаляются незамедлительно после предоставления сервиса."}</p>
                <p className={"disclaimer__text"}>{"Контент:\n" +
                "Данный сервис предназначен для оформления личных фотографии и изображений. Вы\n" +
                "подтверждаете, что используемые Вами изображения и фотографии не нарушают прав третьих\n" +
                "лиц, не носят оскорбительный характер, а также в целом, соответствуют требованиям\n" +
                "действующего законодательства и общепринятым социальным нормам."}</p>
                <button className={"disclaimer__btn"} onClick={onBtnClick}>продолжить</button>
            </div>

        </div>
    )
}


const Result = ({
    onRestartClick,
    images,
    imgWidth,
}) => {
    const image = images[0];

    const canvasRef = useRef();
    const imgRef = useRef();
    const imgBaseRef = useRef();

    useEffect(() => {
        const ctx = canvasRef.current.getContext('2d');
        ctx.drawImage(imgBaseRef.current, 0, 0);

        ctx.drawImage(imgRef.current, 0, 0, imgWidth, imgWidth, 17, 17, 254, 254)
    }, []);

    const handleDownloadClick = () => {
        const image = canvasRef.current.toDataURL("image/png").replace("image/png", "image/octet-stream");

        window.location.href=image;
    }

    return (
      <div className={"result"}>
        <div className={"result__content"}>
            <canvas ref={canvasRef} width={288} height={332}/>
            <img src={image.data_img} alt="" ref={imgRef} style={{display: 'none'}} />
            <img src={base} alt="" ref={imgBaseRef} style={{ display: 'none', width: '288px', height: '332px'}} />
        </div>
          <div className={"result__btn-holder"}>
              <span onClick={onRestartClick} className={"result__reset-btn"}>{"начать заново"}</span>
              <button className={"result__btn"} onClick={handleDownloadClick}>{"скачать на устройство"}</button>
          </div>
      </div>
    )
}
