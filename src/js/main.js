var vm = new Vue({
  el: '#app',
  data: function () {
    return {
      waitLoading: true,
      menuView: 0,
      smWindow: false,
      closeEye: false,
      slider: [],
      timeline: [],
      skillbar: [],
      collection: []
    }
  },
  mounted() {
    var dataInput = []

    for (var i = 1; i <= 3; i++) {
      dataInput.push($.getJSON('../data/website-' + i + '.json'))
    }
    $.when
      .apply($, dataInput)
      .then((...sheetData) => {
        this.timeline = sheetData[0][0]

        var skillbar = {}
        $.each(sheetData[1][0], (key, val) => {
          if (!_.has(skillbar, val['type'])) {
            _.setWith(skillbar, val['type'], [], Object)
          }
          skillbar[val['type']].push(val)
        })
        this.skillbar = skillbar

        this.collection = sheetData[2][0]

        $('.skillbar').each(() => {
          var percent = $(this).attr('data-percent')
          $(this).find('.skillbar-bar').animate({
            width: $(this).attr('data-percent')
          }, 6000)
        })
        this.blinkEye()
      })
    this.$nextTick(() => {
      window.addEventListener('resize', this.getWindowWidth)
      window.addEventListener('resize', this.getWindowHeight)

      // Init
      this.getWindowWidth()
      this.getWindowHeight()
    })
  },
  methods: {
    skillLevel(num) {
      if (num > 66) {
        return 'great'
      }
      else if (num > 40) {
        return 'good'
      }
      else if (num > 30) {
        return 'learning'
      }else {
        return 'notbad'
      }
    },
    blinkEye() {
      var randomTime
      var my = this
      if (this.closeEye) {
        randomTime = Math.floor((Math.random() * 1000) + 500)
      }else {
        randomTime = Math.floor((Math.random() * 3000) + 500)
      }
      setTimeout(() => {
        this.closeEye = !this.closeEye
        my.blinkEye()
      }, randomTime)
    },
    getWindowWidth(event) {
      var windowWidth = document.documentElement.clientWidth
      if (windowWidth < 768) {
        this.smWindow = true
      }else {
        this.smWindow = false
      }
    },

    getWindowHeight(event) {
      var windowHeight = document.documentElement.clientHeight
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.getWindowWidth)
    window.removeEventListener('resize', this.getWindowHeight)
  }
})
