
<template>
    <div class="bili-image">
        <img
            v-lazy="imgUrl"
            :style="imageStyle"
            class="bili-image-inner"
            :class="{ 'bili-image-inner-center': alignCenter }"
        />
        <!-- <div
            v-lazy:background-image="backgroundImage"
            v-if="backgroundImage"
        ></div> -->
    </div>
</template>

<script>
import VueLazyload from 'vue-lazyload';



Vue.use(VueLazyload, {
    observer: true,
    error: require('./img/fail.png'),
    loading: require('./img/loading.png')
    // filter: {
    //     // webp(listener, options) {
    //     //     console.log(listener);
    //     //     if (!options.supportWebp) {
    //     //         return;
    //     //     }
    //     //     const isBfs = /.hdslb.com/;

    //     //     if (isBfs.test(listener.src)) {
    //     //         listener.src += '.webp';
    //     //     }
    //     // }
    // }
});

const isSupportObjectFit = () => document.documentElement.style.objectFit !== undefined;
const ObjectFit = {
    NONE: 'none',
    CONTAIN: 'contain',
    COVER: 'cover',
    FILL: 'fill',
    SCALE_DOWN: 'scale-down'
};

export default {
    name: '',
    props: {
        src: {
            type: String,
            required: true
        },
        width: {
            type: Number,
            default: null
        },
        height: {
            type: Number,
            default: null
        },
        // backgroundImage: {
        //     type: String,
        //     required: false
        // },
        fit: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            imgUrl: this.src,
            imageWidth: 0,
            imageHeight: 0
        };
    },
    watch: {
        src: {
            immediate: true,
            handler(value) {
                if (!value) {
                    return;
                }
                this.imgUrl = this.handleFilterImgSrc(value);
            }
        }
    },
    computed: {
        imageStyle() {
            const { fit } = this;
            if (fit) {
                return isSupportObjectFit() ? { 'object-fit': fit } : this.getImageStyle(fit);
            }

            return {};
        },
        alignCenter() {
            return !isSupportObjectFit() && this.fit !== ObjectFit.FILL;
        }
    },
    mounted() {
        this.$Lazyload.$on('loaded', ({ el }) => {
            this.handleLoad(el);
        });
    },
    methods: {
        handleLoad(img) {
            this.imageWidth = img.width;
            this.imageHeight = img.height;
        },
        handleFilterImgSrc(src) {
            let imgSrc = src;
            const isSupportWebp = this.supportWebp();
            const isBfs = this.supportBfs(src);
            const { width, height } = this;

            // 图片宽高
            const w = width ? `${width}w` : '';
            const h = height ? `${height}h` : '';

            const size = w ? `${w}_${h}` : `${h}`;

            if (isSupportWebp && isBfs) {
                imgSrc = `${src}@${size}.webp`;
                // 去除http https
                imgSrc.replace(/^http(s)?:/g, '');
            }

            return imgSrc;
        },
        supportBfs(src) {
            const isBfs = /.hdslb.com\/bfs/;

            if (isBfs.test(src)) {
                return true;
            }

            return false;
        },
        supportWebp() {
            let support = true;

            try {
                const elem = document.createElement('canvas');

                if (elem.getContext && elem.getContext('2d')) {
                    support = elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
                }
            }
            catch (err) {
                support = false;
            }

            return support;
        },
        getImageStyle(fit) {
            const { imageWidth, imageHeight } = this;
            const { clientWidth: containerWidth, clientHeight: containerHeight } = this.$el;

            if (!imageWidth || !imageHeight || !containerWidth || !containerHeight) {
                return {};
            }

            const vertical = imageWidth / imageHeight < 1;

            if (fit === ObjectFit.SCALE_DOWN) {
                const isSmaller = imageWidth < containerWidth && imageHeight < containerHeight;
                fit = isSmaller ? ObjectFit.NONE : ObjectFit.CONTAIN;
            }

            switch (fit) {
                case ObjectFit.NONE:
                    return { width: 'auto', height: 'auto' };
                case ObjectFit.CONTAIN:
                    return vertical ? { width: 'auto' } : { height: 'auto' };
                case ObjectFit.COVER:
                    return vertical ? { height: 'auto' } : { width: 'auto' };
                default:
                    return {};
            }
        }

    }
};
</script>

<style lang="less" scoped>
.bili-image{
    width: 100%;
    height: 100%;
    position: relative;
    display: inline-block;
    overflow: hidden;
    img[src=''],img:not([src]) {
        opacity: 0;
    }
    img{
        display: block;
        width: 100%;
        height: 100%;
    }
    .bili-image-inner {
        border: 0;
        vertical-align: top;
    }
    .bili-image-inner-center {
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: block;
    }
}
</style>
