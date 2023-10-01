module.exports = {
  mode: 'jit',
  content: ['./components/**/*.{js,vue,ts,html}', './view/**/*.{js,vue,ts,html}'],

  variants: {
    extend: {
      display: ['group-hover'],
      lineClamp: ['hover']
    }
  },
  theme: {
    extend: {
      backgroundColor: {
        colorD62872: '#D62872',
        colorEDE2FF: '#EDE2FF'
      },
      colors: {
        color515151: '#515151',
        colorD62872: '#D62872'
      },
      spacing: {
        'main-span': '64px'
      },
      lineClamp: {
        10: '10',
        12: '12'
      },
      width: ({ theme }) => ({
        auto: 'auto',
        ...theme('spacing'),
        '1/7': '14%',
        '6/7': '85%'
      })
    }
  }
  // plugins: [require('@tailwindcss/forms'), require('@tailwindcss/line-clamp')]
}
