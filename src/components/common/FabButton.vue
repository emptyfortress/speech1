<script setup lang="ts">
const props = defineProps({
	dialog: {
		type: Boolean,
		default: false,
	},
})
const emit = defineEmits(['jam'])
</script>

<template lang="pug">
q-btn.fab(round color="primary" @click="$emit('jam')" size="lg" )
	.menu-btn(:class="{active : props.dialog}")
</template>

<style scoped lang="scss">
.menu-btn {
	display: block;
	width: 28px;
}

.menu-btn:before,
.menu-btn:after {
	background-color: #fff;
	content: '';
	display: block;
	height: 3px;
	transition: all 200ms ease-in-out;
}
.menu-btn:before {
	box-shadow: 0 8px 0 #fff;
	margin-bottom: 13px;
}
.menu-btn.active:before {
	box-shadow: 0 0 0 #fff;
	transform: translateY(8px) rotate(45deg);
}
.menu-btn.active:after {
	transform: translateY(-8px) rotate(-45deg);
}
</style>
