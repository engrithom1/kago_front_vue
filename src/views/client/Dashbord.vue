<template>
        <div class="row gx-3">
            <div class="col-xl-3 col-sm-6">
                <div class="bg-danger mb-3 p-3 text-white rounded-2">
                    <h2 class="mb-2 d-flex align-items-center justify-content-between">
                        <div class="p-3 border border-white rounded-5 d-flex"><i class="ri-box-1-fill fs-4 lh-1"></i>
                        </div><span>{{ this.priceFormat(dataz.transit) }}</span>
                    </h2>
                    <p class="m-0 small"> On Transit Parcels </p>
                </div>
            </div>
            <div class="col-xl-3 col-sm-6">
                <div class="bg-info mb-3 p-3 text-white rounded-2">
                    <h2 class="mb-2 d-flex align-items-center justify-content-between">
                        <div class="p-3 border border-white rounded-5 d-flex"><i class="ri-currency-fill fs-4 lh-1"></i>
                        </div><span>{{ this.priceFormat(dataz.revDay) }}</span>
                    </h2>
                    <p class="m-0 small"> To Day's Revenue </p>
                </div>
            </div>
            <div class="col-xl-3 col-sm-6">
                <div class="bg-primary mb-3 p-3 text-white rounded-2">
                    <h2 class="mb-2 d-flex align-items-center justify-content-between">
                        <div class="p-3 border border-white rounded-5 d-flex"><i class="ri-currency-fill fs-4 lh-1"></i>
                        </div><span>{{ this.priceFormat(dataz.rev7) }}</span>
                    </h2>
                    <p class="m-0 small"> Last 7 Day's Revenue </p>
                </div>
                <div></div>
            </div>
            <div class="col-xl-3 col-sm-6">
                <div class="bg-warning mb-3 p-3 text-white rounded-2">
                    <h2 class="mb-2 d-flex align-items-center justify-content-between">
                        <div class="p-3 border border-white rounded-5 d-flex"><i class="ri-currency-fill fs-4 lh-1"></i>
                        </div><span>{{ this.priceFormat(dataz.rev30) }}</span>
                    </h2>
                    <p class="m-0 small"> Last 30 Day's Revenue </p>
                </div>
            </div>
        </div>
        <div class="row gx-3">
            <div class="col-xl-12">
                <div class="card mb-3">
                    <div class="card-header">
                        <h5 class="card-title">Current Branch</h5>
                    </div>
                    <div class="card-body pt-0">
                        <div class="row">
                            <div class="col-sm-12 col-md-6 mt-3"><img :src="this.$store.state.img_url+user.branch_image"
                                    width="100%"></div>
                            <div class="col-sm-12 col-md-6">
                                <div class="row">
                                    <div class="col-sm-12 col-md-12 mt-3">
                                        <div class="border border-primary-subtle rounded-2 p-3">
                                            <h4>{{this.user.branch_district}} - {{this.user.branch_region}}</h4>
                                            <p>{{this.user.branch_name}}</p>
                                        </div>
                                    </div>
                                    <div class="col-sm-6 col-md-6 mt-3">
                                        <div class="border border-primary-subtle rounded-2 p-3">
                                            <div class="d-flex align-items-center">
                                                <div class="fs-4 fw-bold text-danger">{{ this.priceFormat(dataz.incoming) }}</div>
                                                <p></p><span class="badge float-end bg-danger text-white ms-auto"><i
                                                        class="ri-arrow-right-up-line"></i></span>
                                            </div><small class="text-dark">Incoming Parcels</small>
                                        </div>
                                    </div>
                                    <div class="col-sm-6 col-md-6 mt-3">
                                        <div class="border border-primary-subtle rounded-2 p-3">
                                            <div class="d-flex align-items-center">
                                                <div class="fs-4 fw-bold text-info">{{ this.priceFormat(dataz.outgoing) }}</div><span
                                                    class="badge float-end bg-info text-white ms-auto"><i
                                                        class="ri-arrow-right-up-line"></i></span>
                                            </div><small class="text-dark">Outgoing Parcels</small>
                                        </div>
                                    </div>
                                    <div class="col-sm-6 col-md-6 mt-3">
                                        <div class="border border-primary-subtle rounded-2 p-3">
                                            <div class="d-flex align-items-center">
                                                <div class="fs-4 fw-bold text-dark-green">{{ this.priceFormat(dataz.received_30) }}</div><span
                                                    class="badge float-end bg-primary text-white ms-auto"><i
                                                        class="ri-arrow-right-up-line"></i></span>
                                            </div><small class="text-dark">Received Parcel In Last 30 Day's</small>
                                        </div>
                                    </div>
                                    <div class="col-sm-6 col-md-6 mt-3">
                                        <div class="border border-primary-subtle rounded-2 p-3">
                                            <div class="d-flex align-items-center">
                                                <div class="fs-4 fw-bold text-warning">{{ this.priceFormat(dataz.sent_30) }}</div><span
                                                    class="badge float-end bg-warning text-white ms-auto"><i
                                                        class="ri-arrow-right-up-line"></i></span>
                                            </div><small class="text-dark">Sent Parcel In Last 30 Day's</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>
<script>
import axios from "axios";

export default {

    data() {
        return {
            add_btn: true,
            errors: "",
            data: [],
            tags: [],
            dataz: {},
            user: this.$attrs.user
        };
    },
    methods: {
        async dashbordMenu() {
            var response = await axios
                .get(this.$store.state.api_url + "/dashbord-data")
                .catch((errors) => {
                    var message = "Network or Server Errors";
                    this.$toast.error(message, { duration: 7000, dismissible: true });
                });

            if (response.data.success) {
                this.dataz = response.data.dataz;
            } else {
                var message = response.data.message;
                this.$toast.error(message, { duration: 5000, dismissible: true });
            }
        },
        priceFormat(price) {
            price = parseInt(price)
            return price.toLocaleString()
        }

    },
    created() {
        this.$store.state.page_name = "Dashbord"
        this.dashbordMenu()
    },
};
</script>
