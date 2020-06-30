<template>
  <div class="base">
    <form action="#">
      <textarea cols="40" rows="1" placeholder="напишите сообщение"></textarea>
    </form>
  </div>
</template>

<script>
export default {}
</script>

<style lang="sass" scoped>
  $placeholderColor: #000
  .base
    height: 100%
    form
      position: relative
      margin: auto

      &:before
        content: ''
        position: absolute
        left: 0
        right: 0
        bottom: 0
        height: 1px
        width: 0
        background-color: black
        transition: all 1s
      &:hover
        &:before
          width: 100%
      textarea
        width: 100%
        resize: none
        outline: none
        padding: 15px
        font-size: 1.1em
        position: relative
        border: none

        ::-webkit-scrollbar
          display: none
        ::-webkit-scrollbar-thumb
          diplay: none

        &::-webkit-input-placeholder
          color: $placeholderColor

        &:-moz-placeholder
          color: $placeholderColor

        &::-moz-placeholder
          color: $placeholderColor

        &:-ms-input-placeholder
          color: $placeholderColor

        &::placeholder
          color: $placeholderColor

</style>
