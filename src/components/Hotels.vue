<script setup lang="ts">
defineProps<{
	hotel: string;
	hotels: any[];
	loadHotel: (id: any, hotel: any) => Promise<void>;
}>()
</script>

<template>
	<div class="container mb-4" v-if="!hotel" id="hotels">
		<div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
			<div class="col mt-5" v-for="hotel in hotels">
				<div class="card">
					<img class="card-img-top" :src="hotel.image1" alt="">
					<div class="card-body">
						<h5>{{ hotel.title }}</h5>
						<div style="display: flex; gap: 8px;">
							<h6><span style="font-weight: 500; font-size: 18px;"> {{ hotel.Stars }} <span
										style="font-size: 20px;">⭐</span><span style="font-size: 20px; position: relative; top: -1px;">
										|</span> Город:</span> {{ hotel.City }}</h6>
						</div>
						<a href="#" class="btn btn-outline-dark mt-2" @click="loadHotel(hotel._id, hotel.title)">Посмотреть</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
