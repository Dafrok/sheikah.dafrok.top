/**
 * @file entry
 * @author Dafrok
 */

import './index.styl';
import san from 'san';

const App = san.defineComponent({
    initData() {
        return {
            fontSize: 24,
            text: 'THE SHIEKAH LANGUAGE',
            translate: true
        };
    },
    computed: {
        textGroup() {
            return this.data.get('text').split(' ');
        }
    },
    onTextCompositionstart(e) {
        this.flag = true;
    },
    onTextCompositionend(e) {
        const text = e.target.value.replace(/(?![a-zA-Z0-9\.\-\s\?\!]).{1}/g, '');
        this.data.set('text', text);
        this.flag = false;
    },
    onTextInput(e) {
        if (this.flag) {
            return;
        }
        const text = e.target.value.replace(/(?![a-zA-Z0-9\.\-\s\?\!]).{1}/g, '');
        this.data.set('text', text);
    },
    onTextKeydown(e) {
        if (/(?![a-zA-Z0-9\.\-\s\?\!]).{1}/.test(e.key)) {
            e.preventDefault();
        }
    },
    template: `
<main>
<section class="textbox {{translate ? 'translate' : ''}}" style="font-size: {{fontSize}}px">
    <ruby s-for="word in textGroup"><span>{{word}}</span><rt>{{word}}</rt>&nbsp;</ruby>
</section>
<section class="input-panel">
    <div class="text-container">
        <textarea
            on-compositionstart="onTextCompositionstart"
            on-compositionend="onTextCompositionend"
            on-keydown="onTextKeydown"
            on-input="onTextInput"
            value="{= text =}"
        ></textarea>
    </div>
    <div class="settings">
        <label>
            <ruby>TRANSLATE<rt>TRANSLATE</rt></ruby>
            <input type="checkbox" checked="{= translate =}" >
        </label>
        <label>
            <ruby>FONT-SIZE {{fontSize}}PX<rt>FONT-SIZE {{fontSize}}PX</rt></ruby>
            <br>
            <input type="range" min="10" max="96" value="{= fontSize =}">
        </label>
    </div>
</section>  
</main>  
`
});

const app = new App();
app.attach(document.body);
