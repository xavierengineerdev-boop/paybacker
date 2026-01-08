import { Box, Typography } from '@mui/material'
import { motion } from 'framer-motion'

const ProcessSteps = () => {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      sx={{
        position: 'relative',
        width: '100%',
        maxWidth: '1920px',
        margin: '0 auto',
        backgroundColor: '#FFFFFF',
        marginTop: { xs: '40px', md: '510px' },
        padding: { xs: '0 20px', md: '0' },
        marginBottom: '0',
        overflow: 'visible',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'center',
        alignItems: { xs: 'center', md: 'flex-start' },
        gap: { xs: '30px', md: '30px' },
        zIndex: 1
      }}
    >
      {/* Карточка 1 - Консультации экспертов */}
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.2 }}
        sx={{
          position: 'relative',
          width: { xs: '100%', md: '410.37px' },
          maxWidth: { xs: '400px', md: '410.37px' },
          height: { xs: 'auto', md: '399.87px' },
          minHeight: { xs: '350px', md: '399.87px' },
          flexShrink: 0,
        }}
      >
        {/* Фон карточки для мобильных */}
        <Box
          sx={{
            position: 'relative',
            width: { xs: '100%', md: '410.37px' },
            height: { xs: '100%', md: '399.87px' },
            background: '#DFE5F2',
            borderRadius: { xs: '20px', md: '23.8586px' },
            padding: { xs: '20px', md: '0' },
            display: { xs: 'flex', md: 'block' },
            flexDirection: { xs: 'column', md: 'row' },
            minHeight: { xs: '350px', md: 'auto' },
          }}
        >
          {/* Верхняя часть - только для десктопа */}
          <Box
            sx={{
              display: { xs: 'none', md: 'block' },
              position: 'absolute',
              width: '410.37px',
              height: '267.22px',
              left: '0',
              top: '0',
              background: '#DFE5F2',
              borderRadius: '23.8586px 23.8586px 0px 0px',
            }}
          />
          {/* Нижняя часть - только для десктопа */}
          <Box
            sx={{
              display: { xs: 'none', md: 'block' },
              position: 'absolute',
              width: '410.37px',
              height: '83.98px',
              left: '0',
              top: '267.22px',
              background: '#DFE5F2',
              borderRadius: '0px 0px 23.8586px 23.8586px',
            }}
          />
          {/* Rectangle 22 - только для десктопа */}
          <Box
            sx={{
              display: { xs: 'none', md: 'block' },
              position: 'absolute',
              width: '277.71px',
              height: '132.65px',
              left: '0',
              top: '267.22px',
              background: '#DFE5F2',
              borderRadius: '0px 0px 23.8586px 23.8586px',
            }}
          />
          {/* Белый квадрат - только для десктопа */}
          <Box
            sx={{
              display: { xs: 'none', md: 'block' },
              position: 'absolute',
              width: '132.65px',
              height: '132.65px',
              left: '277.72px',
              top: '267.22px',
              background: '#FFFFFF',
              borderRadius: '23.8586px 0px 0px 0px',
            }}
          />
          {/* Заголовок */}
          <Typography
            component="div"
            sx={{
              position: { xs: 'relative', md: 'absolute' },
              width: { xs: '100%', md: '359px' },
              height: 'auto',
              left: { xs: 'auto', md: '25px' },
              top: { xs: 'auto', md: '45.74px' },
              fontFamily: "'Raleway', sans-serif",
              fontStyle: 'normal',
              fontWeight: 700,
              fontSize: { xs: '24px', md: '42px' },
              lineHeight: '110%',
              letterSpacing: '-0.011em',
              color: '#000000',
              marginBottom: { xs: '15px', md: '0' },
            }}
          >
            Консультации<br />
            экспертов
          </Typography>
          {/* Описание */}
          <Typography
            sx={{
              position: { xs: 'relative', md: 'absolute' },
              width: { xs: '100%', md: '350px' },
              height: 'auto',
              left: { xs: 'auto', md: '25px' },
              top: { xs: 'auto', md: '152.74px' },
              fontFamily: "'Raleway', sans-serif",
              fontStyle: 'normal',
              fontWeight: 500,
              fontSize: { xs: '16px', md: '18px' },
              lineHeight: '125%',
              letterSpacing: '-0.011em',
              color: '#1E1E1E',
              marginBottom: { xs: '20px', md: '0' },
            }}
          >
            Вы оставляете заявку - мы быстро выясняем детали и оцениваем возможность возврата.
          </Typography>
          {/* Иконка */}
          <Box
            component="img"
            src="/images/step1.png"
            alt="Консультации экспертов"
            sx={{
              position: { xs: 'relative', md: 'absolute' },
              width: { xs: '128px', md: '128px' },
              height: { xs: '128px', md: '128px' },
              left: { xs: 'auto', md: '25px' },
              top: { xs: 'auto', md: '248.74px' },
              zIndex: 2,
              flexShrink: 0,
              display: { xs: 'none', md: 'block' },
            }}
          />
          {/* Номер 1 */}
          <Typography
            sx={{
              position: { xs: 'relative', md: 'absolute' },
              width: { xs: 'auto', md: '92px' },
              height: { xs: 'auto', md: '132px' },
              left: { xs: 'auto', md: '297.31px' },
              top: { xs: 'auto', md: '230px' },
              fontFamily: "'Raleway', sans-serif",
              fontStyle: 'normal',
              fontWeight: 700,
              fontSize: { xs: '80px', md: '186.1px' },
              lineHeight: '110%',
              letterSpacing: '-0.011em',
              color: '#9EBBF4',
              zIndex: 2,
              overflow: 'visible',
              display: { xs: 'none', md: 'block' },
            }}
          >
            1
          </Typography>
          {/* Контейнер для иконки и номера на мобильных */}
          <Box
            sx={{
              position: 'relative',
              display: { xs: 'flex', md: 'none' },
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              width: '100%',
              marginTop: 'auto',
            }}
          >
            {/* Иконка для мобильных */}
            <Box
              component="img"
              src="/images/step1.png"
              alt="Консультации экспертов"
              sx={{
                width: '128px',
                height: '128px',
                flexShrink: 0,
              }}
            />
            {/* Номер 1 для мобильных */}
            <Typography
              sx={{
                fontFamily: "'Raleway', sans-serif",
                fontStyle: 'normal',
                fontWeight: 700,
                fontSize: '80px',
                lineHeight: '110%',
                letterSpacing: '-0.011em',
                color: '#9EBBF4',
              }}
            >
              1
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Карточка 2 - Оспаривание платежей (выше других) */}
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.2 }}
        sx={{
          position: 'relative',
          width: { xs: '100%', md: '412.21px' },
          maxWidth: { xs: '400px', md: '412.21px' },
          height: { xs: 'auto', md: '418.7px' },
          minHeight: { xs: '350px', md: '418.7px' },
          flexShrink: 0,
          marginTop: { xs: '0', md: '-19.31px' },
        }}
      >
        {/* Фон карточки для мобильных */}
        <Box
          sx={{
            position: 'relative',
            width: { xs: '100%', md: '412.21px' },
            height: { xs: '100%', md: '418.7px' },
            background: { xs: '#DFE5F2', md: 'transparent' },
            borderRadius: { xs: '20px', md: '0' },
            padding: { xs: '20px', md: '0' },
            display: { xs: 'flex', md: 'block' },
            flexDirection: { xs: 'column', md: 'row' },
            minHeight: { xs: '350px', md: 'auto' },
          }}
        >
          {/* Верхняя часть - только для десктопа */}
          <Box
            sx={{
              display: { xs: 'none', md: 'block' },
              position: 'absolute',
              width: '411.84px',
              height: '133.6px',
              left: '0',
              top: '19.31px',
              background: '#DFE5F2',
              borderRadius: '25px 25px 0px 0px',
            }}
          />
          {/* Rectangle 22 - только для десктопа */}
          <Box
            sx={{
              display: { xs: 'none', md: 'block' },
              position: 'absolute',
              width: '278.96px',
              height: '133.25px',
              left: '0',
              top: '19.31px',
              background: '#DFE5F2',
              borderRadius: '25px 25px 0px 0px',
            }}
          />
          {/* Нижняя часть - только для десктопа */}
          <Box
            sx={{
              display: { xs: 'none', md: 'block' },
              position: 'absolute',
              width: '412.21px',
              height: '268.42px',
              left: '0',
              top: '150.97px',
              background: '#DFE5F2',
              borderRadius: '0px 25px 25px 25px',
            }}
          />
          {/* Белый квадрат - только для десктопа */}
          <Box
            sx={{
              display: { xs: 'none', md: 'block' },
              position: 'absolute',
              width: '132.59px',
              height: '133.6px',
              left: '279.25px',
              top: '19.31px',
              background: '#FFFFFF',
              borderRadius: '0px 0px 0px 25px',
            }}
          />
          {/* Заголовок */}
          <Typography
            component="div"
            sx={{
              position: { xs: 'relative', md: 'absolute' },
              width: { xs: '100%', md: '341px' },
              height: 'auto',
              left: { xs: 'auto', md: '36px' },
              top: { xs: 'auto', md: '190px' },
              fontFamily: "'Raleway', sans-serif",
              fontStyle: 'normal',
              fontWeight: 700,
              fontSize: { xs: '24px', md: '38px' },
              lineHeight: '110%',
              textAlign: { xs: 'left', md: 'center' },
              letterSpacing: '-0.011em',
              color: '#1E1E1E',
              marginBottom: { xs: '15px', md: '0' },
              zIndex: { xs: 1, md: 2 },
            }}
          >
            Оспаривание<br />
            платежей
          </Typography>
          {/* Описание */}
          <Typography
            sx={{
              position: { xs: 'relative', md: 'absolute' },
              width: { xs: '100%', md: '336px' },
              height: 'auto',
              left: { xs: 'auto', md: '36px' },
              top: { xs: 'auto', md: '290px' },
              fontFamily: "'Raleway', sans-serif",
              fontStyle: 'normal',
              fontWeight: 500,
              fontSize: { xs: '16px', md: '18px' },
              lineHeight: '125%',
              textAlign: { xs: 'left', md: 'center' },
              letterSpacing: '-0.011em',
              color: '#1E1E1E',
              marginBottom: { xs: '20px', md: '0' },
              zIndex: { xs: 1, md: 2 },
            }}
          >
            Готовим документы и подаём обращение в банк/платёжную систему, ведём процесс до решения.
          </Typography>
          {/* Иконка */}
          <Box
            component="img"
            src="/images/step2.png"
            alt="Оспаривание платежей"
            sx={{
              position: { xs: 'relative', md: 'absolute' },
              width: { xs: '177px', md: '177px' },
              height: { xs: '177px', md: '177px' },
              left: { xs: 'auto', md: '5px' },
              top: { xs: 'auto', md: '1px' },
              zIndex: { xs: 1, md: 3 },
              flexShrink: 0,
              display: { xs: 'none', md: 'block' },
            }}
          />
          {/* Номер 2 */}
          <Typography
            sx={{
              position: { xs: 'relative', md: 'absolute' },
              width: { xs: 'auto', md: '107px' },
              height: { xs: 'auto', md: '134px' },
              left: { xs: 'auto', md: '292.4px' },
              top: { xs: 'auto', md: '-35px' },
              fontFamily: "'Raleway', sans-serif",
              fontStyle: 'normal',
              fontWeight: 700,
              fontSize: { xs: '80px', md: '188.919px' },
              lineHeight: '110%',
              letterSpacing: '-0.011em',
              color: '#9EBBF4',
              zIndex: { xs: 1, md: 3 },
              overflow: 'visible',
              display: { xs: 'none', md: 'block' },
            }}
          >
            2
          </Typography>
          {/* Контейнер для иконки и номера на мобильных */}
          <Box
            sx={{
              position: 'relative',
              display: { xs: 'flex', md: 'none' },
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              width: '100%',
              marginTop: 'auto',
            }}
          >
            {/* Иконка для мобильных */}
            <Box
              component="img"
              src="/images/step2.png"
              alt="Оспаривание платежей"
              sx={{
                width: '177px',
                height: '177px',
                flexShrink: 0,
              }}
            />
            {/* Номер 2 для мобильных */}
            <Typography
              sx={{
                fontFamily: "'Raleway', sans-serif",
                fontStyle: 'normal',
                fontWeight: 700,
                fontSize: '80px',
                lineHeight: '110%',
                letterSpacing: '-0.011em',
                color: '#9EBBF4',
              }}
            >
              2
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Карточка 3 - Возврат денежных средств */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        sx={{
          position: 'relative',
          width: { xs: '100%', md: '410.37px' },
          maxWidth: { xs: '400px', md: '410.37px' },
          height: { xs: 'auto', md: '399.87px' },
          minHeight: { xs: '350px', md: '399.87px' },
          flexShrink: 0,
        }}
      >
        {/* Фон карточки для мобильных */}
        <Box
          sx={{
            position: 'relative',
            width: { xs: '100%', md: '410.37px' },
            height: { xs: '100%', md: '399.87px' },
            background: '#DFE5F2',
            borderRadius: { xs: '20px', md: '23.8586px' },
            padding: { xs: '20px', md: '0' },
            display: { xs: 'flex', md: 'block' },
            flexDirection: { xs: 'column', md: 'row' },
            minHeight: { xs: '350px', md: 'auto' },
          }}
        >
          {/* Верхняя часть - только для десктопа */}
          <Box
            sx={{
              display: { xs: 'none', md: 'block' },
              position: 'absolute',
              width: '410.37px',
              height: '267.22px',
              left: '0',
              top: '0',
              background: '#DFE5F2',
              borderRadius: '23.8586px 23.8586px 0px 0px',
            }}
          />
          {/* Нижняя часть - только для десктопа */}
          <Box
            sx={{
              display: { xs: 'none', md: 'block' },
              position: 'absolute',
              width: '410.37px',
              height: '83.98px',
              left: '0',
              top: '267.22px',
              background: '#DFE5F2',
              borderRadius: '0px 0px 23.8586px 23.8586px',
            }}
          />
          {/* Rectangle 22 - только для десктопа */}
          <Box
            sx={{
              display: { xs: 'none', md: 'block' },
              position: 'absolute',
              width: '277.71px',
              height: '132.65px',
              left: '0',
              top: '267.22px',
              background: '#DFE5F2',
              borderRadius: '0px 0px 23.8586px 23.8586px',
            }}
          />
          {/* Белый квадрат - только для десктопа */}
          <Box
            sx={{
              display: { xs: 'none', md: 'block' },
              position: 'absolute',
              width: '132.65px',
              height: '132.65px',
              left: '277.72px',
              top: '267.22px',
              background: '#FFFFFF',
              borderRadius: '23.8586px 0px 0px 0px',
            }}
          />
          {/* Заголовок */}
          <Typography
            component="div"
            sx={{
              position: { xs: 'relative', md: 'absolute' },
              width: { xs: '100%', md: '350px' },
              height: 'auto',
              left: { xs: 'auto', md: '25.37px' },
              top: { xs: 'auto', md: '31.2px' },
              fontFamily: "'Raleway', sans-serif",
              fontStyle: 'normal',
              fontWeight: 700,
              fontSize: { xs: '24px', md: '37.3887px' },
              lineHeight: '110%',
              letterSpacing: '-0.011em',
              color: '#1E1E1E',
              marginBottom: { xs: '15px', md: '0' },
            }}
          >
            Возврат денежных<br />
            средств
          </Typography>
          {/* Описание */}
          <Typography
            sx={{
              position: { xs: 'relative', md: 'absolute' },
              width: { xs: '100%', md: '301px' },
              height: 'auto',
              left: { xs: 'auto', md: '25.37px' },
              top: { xs: 'auto', md: '134.74px' },
              fontFamily: "'Raleway', sans-serif",
              fontStyle: 'normal',
              fontWeight: 500,
              fontSize: { xs: '16px', md: '20px' },
              lineHeight: '125%',
              letterSpacing: '-0.011em',
              color: '#1E1E1E',
              marginBottom: { xs: '20px', md: '0' },
            }}
          >
            При одобрении средства возвращаются на ваш счёт. Мы сопровождаем до фактического зачисления.
          </Typography>
          {/* Иконка */}
          <Box
            component="img"
            src="/images/step3.png"
            alt="Возврат денежных средств"
            sx={{
              position: { xs: 'relative', md: 'absolute' },
              width: { xs: '196px', md: '196px' },
              height: { xs: '133px', md: '133px' },
              left: { xs: 'auto', md: '0.37px' },
              top: { xs: 'auto', md: '263.74px' },
              zIndex: 2,
              flexShrink: 0,
              display: { xs: 'none', md: 'block' },
            }}
          />
          {/* Номер 3 */}
          <Typography
            sx={{
              position: { xs: 'relative', md: 'absolute' },
              width: { xs: 'auto', md: '105px' },
              height: { xs: 'auto', md: '133px' },
              left: { xs: 'auto', md: '290.98px' },
              top: { xs: 'auto', md: '240px' },
              fontFamily: "'Raleway', sans-serif",
              fontStyle: 'normal',
              fontWeight: 700,
              fontSize: { xs: '80px', md: '170px' },
              lineHeight: '110%',
              letterSpacing: '-0.011em',
              color: '#9EBBF4',
              zIndex: 2,
              overflow: 'visible',
              display: { xs: 'none', md: 'block' },
            }}
          >
            3
          </Typography>
          {/* Контейнер для иконки и номера на мобильных */}
          <Box
            sx={{
              position: 'relative',
              display: { xs: 'flex', md: 'none' },
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              width: '100%',
              marginTop: 'auto',
            }}
          >
            {/* Иконка для мобильных */}
            <Box
              component="img"
              src="/images/step3.png"
              alt="Возврат денежных средств"
              sx={{
                width: '196px',
                height: '133px',
                flexShrink: 0,
              }}
            />
            {/* Номер 3 для мобильных */}
            <Typography
              sx={{
                fontFamily: "'Raleway', sans-serif",
                fontStyle: 'normal',
                fontWeight: 700,
                fontSize: '80px',
                lineHeight: '110%',
                letterSpacing: '-0.011em',
                color: '#9EBBF4',
              }}
            >
              3
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ProcessSteps
