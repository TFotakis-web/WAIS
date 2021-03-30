<template>
	<ion-grid fixed>
		<h1 class="ion-text-center">{{ $t('various.underConstruction') }}</h1>
<!--	<div class="text-center pt-5">
		<h1>{{ $t('views.platformData.pageTitle') }}</h1>
		<h5 class="text-info">{{ $t('various.underConstruction') }}</h5>
		<mdb-container>
			<mdb-row>
				<mdb-col>
					<mdb-breadcrumb class="breadcrumb-with-arrows">
						<mdb-breadcrumb-item v-for="(item, index) in breadcrumbItems" :key="index">
							<span v-if="index < breadcrumbItems.length - 1" @click="selectBreadcrumbItem(index)" class="a-tag">{{ item }}</span>
							<span v-else>{{ item }}</span>
						</mdb-breadcrumb-item>
					</mdb-breadcrumb>
					<mdb-list-group>
						<mdb-list-group-item
							v-for="(el, key, index) in curData"
							:key="itemKey + String(key) + String(index)"
							:justify-content-between="false"
						>
							<template v-if="Array.isArray(el)">
								<span @click="selectKey(key)" class="a-tag">{{ key }}</span>
							</template>
							<template v-else-if="typeof el === 'string' && el !== null">
								<span v-if="!Array.isArray(curData)" class="mr-1">{{ key }}:</span>
								<span>{{ el }}</span>
							</template>
							<template v-else-if="typeof el === 'number' && el !== null">
								<span v-if="!Array.isArray(curData)" class="mr-1">{{ key }}:</span>
								<span>{{ el }}</span>
							</template>
							<template v-else-if="el.constructor === Object">
								<span @click="selectKey(key)" class="a-tag">{{ key }}</span>
							</template>
							<mdb-icon icon="trash" @click="deleteItem(key)" class="clickable ml-auto"/>
						</mdb-list-group-item>
						<mdb-list-group-item :justify-content-between="false" class="mt-3">
							<template v-if="newItemType === ''">
								<span class="mr-1">{{ $t('actions.add') }}:</span>
								<template v-if="Array.isArray(curData)">
									<span
										class="a-tag"
										v-if="curData[0] === undefined || typeof curData[0] === 'string'"
										@click="addNewItem('String')"
									>{{ $t('views.platformData.string') }}</span
									>
									<span v-if="curData[0] === undefined" class="mr-1">,</span>
									<span
										class="a-tag"
										v-if="curData[0] === undefined || typeof curData[0] === 'number'"
										@click="addNewItem('Number')"
									>{{ $t('views.platformData.number') }}</span
									>
								</template>
								<template v-else-if="curData.constructor === Object">
									<span class="a-tag mr-1" @click="addNewItem('String')">{{ $t('views.platformData.string') }},</span>
									<span class="a-tag mr-1" @click="addNewItem('Number')">{{ $t('views.platformData.number') }},</span>
									<span class="a-tag mr-1" @click="addNewItem('Array')">{{ $t('views.platformData.array') }},</span>
									<span class="a-tag mr-1" @click="addNewItem('Object')">{{ $t('views.platformData.object') }}</span>
								</template>
							</template>
							<template v-else>
								<mdb-input v-if="curData.constructor === Object" v-model="newItemKey" label="Key" class="my-0 mr-1"/>
								<template v-if="newItemType === 'String'">
									<mdb-input v-model="newItemValue" label="Value" class="my-0"/>
								</template>
								<template v-else-if="newItemType === 'Number'">
									<mdb-input v-model="newItemValue" type="number" label="Value" class="my-0"/>
								</template>
								<mdb-icon icon="save" @click="saveNewItem" class="ml-auto mr-1"/>
								<mdb-icon icon="times" @click="cancelSaveNewItem"/>
							</template>
						</mdb-list-group-item>
					</mdb-list-group>
					<mdb-btn color="success" :disabled="saveIsDisabled" @click="save">{{ $t('actions.save') }}</mdb-btn>
				</mdb-col>
			</mdb-row>
		</mdb-container>
	</div>-->
	</ion-grid>
</template>
<script>
	export default {
		name: 'PlatformData',
		mounted() {
			this.$store.commit('pageStructure/setPageTitle', () => window.vm.$t('views.platformData.pageTitle'));
			this.$store.commit('pageStructure/setPageBackButton', false);
		},
		data() {
			return {
				breadcrumbItems: ['Home'],
				curData: this.$root.platformData,
				saveIsDisabled: true,
				newItemType: '',
				newItemKey: '',
				newItemValue: null,
			};
		},
		methods: {
			selectKey(key) {
				this.curData = this.curData[key];
				this.breadcrumbItems.push(key);
			},
			selectBreadcrumbItem(index) {
				this.breadcrumbItems.length = index + 1;
				let tempData = this.$root.platformData;
				for (let i = 1; i < this.breadcrumbItems.length; i++) {
					tempData = tempData[this.breadcrumbItems[i]];
				}
				this.curData = tempData;
			},
			addNewItem(itemType) {
				this.newItemType = itemType;
			},
			saveNewItem() {
				if (Array.isArray(this.curData)) {
					if (this.newItemType === 'String') {
						this.curData.push(this.newItemValue);
					} else if (this.newItemType === 'Number') {
						this.curData.push(Number(this.newItemValue));
					}
				} else {
					if (Object.keys(this.curData).includes(this.newItemKey)) {
						this.$notify.error({
							message: this.$t('views.platformData.thisKeyIsAlreadyInUse'),
							progressBar: true,
							timeOut: 10000,
						});
						return;
					}
					if (this.newItemType === 'String') {
						this.curData[this.newItemKey] = this.newItemValue;
					} else if (this.newItemType === 'Number') {
						this.curData[this.newItemKey] = Number(this.newItemValue);
					} else if (this.newItemType === 'Array') {
						this.curData[this.newItemKey] = [];
					} else if (this.newItemType === 'Object') {
						this.curData[this.newItemKey] = {};
					}
				}
				this.newItemType = '';
				this.newItemKey = '';
				this.newItemValue = null;
				this.saveIsDisabled = false;
			},
			cancelSaveNewItem() {
				this.newItemType = '';
			},
			deleteItem(key) {
				if (Array.isArray(this.curData)) {
					this.curData.splice(key, 1);
				} else {
					this.$delete(this.curData, key);
				}
				this.saveIsDisabled = false;
			},
			save() {
				this.saveIsDisabled = true;
			},
		},
		computed: {
			itemKey() {
				return this.breadcrumbItems.join();
			},
		},
	};
</script>
