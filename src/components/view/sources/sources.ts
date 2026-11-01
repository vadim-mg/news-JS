import './sources.css';

class Sources {
    draw(data) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');
        if (!sourceItemTemp) return;

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;
            if (!sourceClone) return;

            const nameEl = sourceClone.querySelector('.source__item-name');
            if (nameEl) nameEl.textContent = item.name;

            const itemEl = sourceClone.querySelector('.source__item');
            if (itemEl) itemEl.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        const sourcesContainer = document.querySelector('.sources');
        if (sourcesContainer) sourcesContainer.append(fragment);
    }
}

export default Sources;
