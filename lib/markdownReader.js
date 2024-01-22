import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export function getDataInArray(pathString) {
    const fileDir = path.join(process.cwd(), pathString);
    const fileNames = fs.readdirSync(fileDir);

    return fileNames.map(fileName => {
        const fullPath = path.join(fileDir, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
            fileName,
            ...data,
            content,
        };
    });
}


export function getDataInObject(pathString) {
    const fileDir = path.join(process.cwd(), pathString);
    const fileNames = fs.readdirSync(fileDir);
    const fetchedData = {};

    fileNames.forEach(fileName => {
        const fullPath = path.join(fileDir, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        fetchedData[fileName.replace('.md', '')] = {
            ...data,
            content,
        };
    });

    return fetchedData;
}

export default { getDataInArray, getDataInObject };