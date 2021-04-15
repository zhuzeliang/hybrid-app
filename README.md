# hybrid-app

hybrid混合开发

### 顶部安全距离设置 HeaderEmpty

```
<template>
    <div
        class="header-empty"
        v-show="isSupportNA"
        :style="style"
    >
        <slot></slot>
    </div>
</template>

<script>

import { addResizeListener, removeResizeListener } from '@/common/js/resize-event';
import { isSupportNA } from '@/common/js/utils';

export default {
    name: 'HeaderEmpty',
    props: {
        background: {
            type: String,
            default: ''
        },
        height: {
            type: Number,
            default: 20
        }
    },
    data() {
        const ua = navigator.userAgent;
        let notchHeight = 0;
        if (/\sNotchHeight=(\d+)/.test(ua)) {
            notchHeight = parseInt(ua.match(/\sNotchHeight=(\d+)/)[1], 0);
        }
        return {
            isSupportNA,
            notchHeight
        };
    },
    computed: {
        style() {
            const { background, notchHeight } = this;
            let heightObj = {};
            if (notchHeight) {
                heightObj = {
                    height: `${notchHeight}px`
                };
            }

            return {
                background,
                ...heightObj
            };
        }
    },
    mounted() {
        addResizeListener(this.$el, this.handleUpdateEl);
    },
    beforeDestroy() {
        removeResizeListener(this.$el, this.handleUpdateEl);
    },
    methods: {
        handleUpdateEl() {
            const height = this.$el.clientHeight;
            this.$emit('update:height', height);
        }
    }
};
</script>

<style lang="less" scoped>

    //iphonex
    .header-empty {
        height: 20px;
    }
    //iphonex
    @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
        .header-empty {
            height: 44px;
        }
    }

    //iphonexr
    @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
        .header-empty {
            height: 44px;
        }
    }
    //iphone11
    @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 2) {
        .header-empty{
            height: 44px;
        }
    }

    //iphonexs max
    @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
        .header-empty {
            height: 44px;
        }

    }
    .iphone12() {
        .bili-header-empty {
            height: 44px;
        }
    }
    //iphone 12 mini: 分辨率为1080×2340
    @media only screen and (device-width: 375px) and (device-height: 812px) {
        .iphone12();
    }
    //iphone 12 and 12 pro: 分辨率为1170×2532
    @media only screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) {
        .iphone12();
    }
    //iphone 12 pro max: 分辨率为1284×2778
    @media only screen and (device-width: 428px) and (device-height: 926px) {
        .iphone12();
    }
</style>
```

### 底部安全距离
```
<template>
    <div
        class="bottom-empty"
        v-show="isSupportNA"
        :style="style"
    >
        <slot></slot>
    </div>
</template>

<script>
import { addResizeListener, removeResizeListener } from '@/common/js/resize-event';
import { isSupportNA } from '@/common/js/utils';

export default {
    name: 'BottomEmpty',
    props: {
        background: {
            type: String,
            default: ''
        },
        height: {
            type: Number,
            default: 34
        }
    },
    data() {
        return {
            isSupportNA
        };
    },
    computed: {
        style() {
            const { background } = this;
            if (!background) {
                return {};
            }
            return {
                background
            };
        }
    },
    mounted() {
        addResizeListener(this.$el, this.handleUpdateEl);
    },
    beforeDestroy() {
        removeResizeListener(this.$el, this.handleUpdateEl);
    },
    methods: {
        handleUpdateEl() {
            const height = this.$el.clientHeight;
            this.$emit('update:height', height);
        }
    }
};
</script>

<style lang="less" scoped>

    .bottom-empty {
        height: constant(safe-area-inset-bottom);
        height: env(safe-area-inset-bottom);
    }

    //iphonex
    @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
        .bottom-empty {
            height: 34px;
        }
    }

    //iphonexr
    @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
        .bottom-empty {
            height: 34px;
        }

    }
    //iphone11
    @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 2) {
        .bottom-empty {
            height: 34px;
        }
    }

    //iphonexs max
    @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
        .bottom-empty {
            height: 34px;
        }
    }
    .iphone12() {
        .bottom-empty {
            height: 34px;
        }
    }
    //iphone 12 mini: 分辨率为1080×2340
    @media only screen and (device-width: 375px) and (device-height: 812px) {
        .iphone12();
    }
    //iphone 12 and 12 pro: 分辨率为1170×2532
    @media only screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) {
        .iphone12();
    }
    //iphone 12 pro max: 分辨率为1284×2778
    @media only screen and (device-width: 428px) and (device-height: 926px) {
        .iphone12();
    }
</style>
```
