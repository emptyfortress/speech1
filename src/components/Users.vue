<template lang="pug">
q-page(padding)
	.container
		q-table(:columns="columns"
			:rows="users"
			binary-state-sort
			:pagination="pagination"
			:filter="filter"
			rows-per-page-label="Строк на стр."
			row-key="id"
			).table.rel
			template(v-slot:top="props")
				.zag
					q-icon(name="mdi-account-multiple").q-mr-md
					|Пользователи
					span.q-ml-md ({{users.length}})
				q-space
				q-input(dense debounce="300" color="primary" v-model="filter" clearable)
					template(v-slot:prepend)
						q-icon(name="mdi-magnify")
			template(v-slot:body="props")
				q-tr(:props="props")
					q-td(key="email" :props="props")
						|{{ props.row.email }}
						q-popup-edit(v-model="props.row.email" auto-save v-slot="scope").border-primary
							q-input(v-model="scope.value" dense autofocus counter @keyup.enter="scope.set").small
					q-td(key="password" :props="props")
					q-td(key="region" :props="props")
						|{{ list(props.row.region) }}
						q-popup-edit(v-model="props.row.region").border-primary

							component(:is="NewSelect"
								:model="props.row.region"
								:options="regionOptions"
								:width="250"
								@update:model-value="setRegion(props.rowIndex, $event)")

					q-td(key="oper" :props="props")
						|{{ props.row.oper.length }}
						q-popup-edit(v-model="props.row.oper" auto-save v-slot="scope").border-primary
							component(:is="NewSelect"
								:model="props.row.oper"
								:options="operOptions"
								:width="250"
								@update:model-value="setOper(props.rowIndex, $event)")

					q-td(key="group" :props="props")
						|{{ list(props.row.group) }}
						q-popup-edit(v-model="props.row.group" auto-save v-slot="scope" style="width: 230px;").border-primary
							component(:is="NewSelect"
								:model="props.row.group"
								:options="groupOptions"
								@update:model-value="setGroup(props.rowIndex, $event)")

					q-td(key="del" :props="props")
						q-btn(flat round icon="mdi-trash-can-outline" size="sm" @click="kill(props.row)").hov
			template(v-slot:bottom)
				q-btn(unelevated round icon="mdi-plus" color="primary" size="sm" @click="addUser")

</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useQuasar } from 'quasar'
import NewSelect from '@/components/common/NewSelect.vue'
import { operators } from '@/stores/operators'

interface User {
	id: number
	fio?: string
	email: string
	password?: string
	region?: string[] | null
	group?: string[]
	oper?: string[]
}

const columns: Column[] = [
	{ name: 'email', label: 'Email', field: 'email', sortable: true, align: 'left' },
	{ name: 'password', label: 'Пароль', field: 'password', sortable: false, align: 'left' },
	{
		name: 'region',
		label: 'Регион',
		field: 'region',
		sortable: true,
		align: 'left',
		format: (val) => val.join(', '),
	},
	{
		name: 'oper',
		label: 'Операторы',
		field: 'oper',
		sortable: true,
		align: 'right',
		format: (val) => `${val.length}`,
	},
	{
		name: 'group',
		label: 'Группы',
		field: 'group',
		sortable: true,
		align: 'left',
		format: (val) => val.join(', '),
	},
	{
		name: 'del',
		label: '',
		field: 'del',
	},
]

const users: User[] = reactive([
	{
		id: 0,
		fio: 'Соловьев П.С.',
		email: 'solo@gmail.com',
		region: ['Центр', 'Восток'],
		group: ['Группа 1', 'Сервисная служба'],
		oper: ['Екатерина', 'Елена', 'Ксения', 'Ирина', 'Ева', 'Дарья', 'Кира'],
	},
	{
		id: 1,
		fio: 'Воронин Т.П.',
		email: 'vor@gmail.com',
		region: ['Восток'],
		group: ['Сервисная служба'],
		oper: [
			'Софья',
			'Алина',
			'Злата',
			'Милана',
			'Ольга',
			'Светлана',
			'Ярослава',
			'Яна',
			'Кристина',
			'Алиса',
			'Маргарита',
			'Таисия',
			'Тамара',
			'Эмилия',
			'Диана',
			'Анфиса',
		],
	},
	{
		id: 2,
		fio: 'Орлова Г.Н.',
		email: 'orlova@gmail.com',
		region: ['Центр'],
		group: ['Сервисная служба'],
		oper: [
			'Диана',
			'Анфиса',
			'Аделина',
			'Евдокия',
			'Зоя',
			'Ираида',
			'Наталья',
			'Пелагея',
			'Сабина',
			'Антонина',
		],
	},
])

const filter = ref('')

const pagination = ref({
	page: 1,
	rowsPerPage: 10,
})

const compare = (a: User, b: User) => {
	if (a.id > b.id) return 1
	if (a.id < b.id) return -1
	return 0
}

const undo = (e: User) => {
	users.push(e)
	users.sort(compare)
}
const show = (e: User) => {
	let message = e.email + ' - удалено.'
	$q.notify({
		message: message,
		color: 'negative',
		actions: [
			{
				label: 'Вернуть',
				color: 'white',
				handler: () => undo(e),
			},
		],
	})
}

const $q = useQuasar()
const kill = (e: User) => {
	const index = users.indexOf(e)
	users.splice(index, 1)
	show(e)
}

const list = (array: string[]): string => {
	return array.join(', ')
}

const regions = ['Центр', 'Восток', 'Запад', 'Юг', 'Спб и окрестности']
const regionOptions = ref(regions)

const setRegion = (e: number, a: string[] | null) => {
	if (a) {
		users[e].region = a
	} else {
		users[e].region = []
	}
}

const groups = ['Группа 1', 'Админы', 'Спецконтингент', 'Сервисная служба', 'Глухари']
const groupOptions = ref(groups)

const setGroup = (e: number, a: string[] | null) => {
	if (a) {
		users[e].group = a
	} else {
		users[e].group = []
	}
}

const oper = computed(() => {
	return operators.map((e) => e.name)
})
const operOptions = ref(oper)

const setOper = (e: number, a: string[] | null) => {
	if (a) {
		users[e].oper = a
	} else {
		users[e].oper = []
	}
}
const addUser = () => {
	let user: User = {
		id: users.length,
		email: 'Укажите почту',
		password: '',
		region: [],
		group: [],
		oper: [],
	}
	users.push(user)
}
</script>

<style scoped lang="scss">
//@import '@/assets/css/colors.scss';
td {
	white-space: normal;
}
.hov {
	color: #aaa;
	&:hover {
		color: black;
	}
}
.add {
	position: absolute;
	bottom: 0;
	left: 0;
}
</style>
